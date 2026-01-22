
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Domain Lockdown & Canonicalization
    const hostname = request.headers.get('host') || '';
    const currentPath = request.nextUrl.pathname;
    const currentSearch = request.nextUrl.search;
    const primaryDomain = 'www.rizwanulafraim.com';
    const isProduction = process.env.NODE_ENV === 'production';

    // 1. Canonical Header Injection
    const canonicalUrl = `https://${primaryDomain}${currentPath}`;
    response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);

    // 2. Proxy Domain Lockdown (301 Redirect)
    if (isProduction && hostname !== primaryDomain && !hostname.includes('localhost')) {
        if (hostname) {
            const newUrl = new URL(`https://${primaryDomain}${currentPath}${currentSearch}`);
            return NextResponse.redirect(newUrl, { status: 301 });
        }
    }

    // Create an unmodified Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    const newResponse = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.headers.forEach((value, key) => {
                        newResponse.headers.set(key, value);
                    });
                    response = newResponse;
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    const newResponse = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.headers.forEach((value, key) => {
                        newResponse.headers.set(key, value);
                    });
                    response = newResponse;
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    let user = null;
    try {
        const { data } = await supabase.auth.getUser();
        user = data.user;
    } catch (error) {
        // Suppress auth errors in middleware to avoid 500s
        console.error('Middleware Auth Error:', error);
    }

    // Protected Routes Logic
    // If user is NOT logged in and trying to access /budget or /onboarding
    if (!user && (request.nextUrl.pathname.startsWith('/budget') || request.nextUrl.pathname.startsWith('/onboarding'))) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/login'
        return NextResponse.redirect(redirectUrl)
    }

    // Optional: If user IS logged in and trying to access /login, send them to /budget
    if (user && request.nextUrl.pathname.startsWith('/login')) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/budget'
        return NextResponse.redirect(redirectUrl)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - auth (auth routes)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|auth).*)',
    ],
}
