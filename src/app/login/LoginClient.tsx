
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Magic Link Login
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            alert(error.message);
            setLoading(false);
        } else {
            alert("Check your email for the login link!");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Welcome to WealthOS</h1>
                    <p className="text-gray-500 text-sm">The Platinum Standard for Personal Finance.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-900 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Send Magic Link <ArrowRight className="w-4 h-4" /></>}
                    </button>

                    <p className="text-center text-[10px] text-gray-500 mt-4 leading-tight">
                        <strong>Important:</strong> You must click the link in <br />
                        <span className="text-black font-bold">THIS SAME BROWSER</span> or it will fail.
                    </p>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Secure passwordless login via Magic Link.
                    </p>
                </form>
            </div>
        </div>
    );
}
