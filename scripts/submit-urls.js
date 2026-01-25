/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');

const SITE_URL = 'https://www.rizwanulafraim.com';
const API_KEY = 'a283aacaa2ad42f1b22006feb4773655';
const KEY_LOCATION = `${SITE_URL}/${API_KEY}.txt`;

// Key pages to index
const URL_LIST = [
    `${SITE_URL}/`,
    `${SITE_URL}/projects`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/case-studies`,
    `${SITE_URL}/wiki`,
    `${SITE_URL}/manifesto`
];

const submitIndexNow = () => {
    const data = JSON.stringify({
        host: 'www.rizwanulafraim.com',
        key: API_KEY,
        keyLocation: KEY_LOCATION,
        urlList: URL_LIST
    });

    const options = {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
        }
    };

    console.log('🚀 Sending "IndexNow" payload to Bing/Yandex...');

    const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        if (res.statusCode === 200 || res.statusCode === 202) {
            console.log('✅ IndexNow Submission Successful! (Received 200/202 Accepted)');
        } else {
            console.error('❌ IndexNow Submission Failed.');
            console.error(`Response Headers: ${JSON.stringify(res.headers)}`);
        }

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (error) => {
        console.error('❌ Error requesting IndexNow:', error);
    });

    req.write(data);
    req.end();
};

const pingGoogle = () => {
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

    console.log('📡 Pinging Google Sitemap (Note: This endpoint is deprecated by Google)...');

    https.get(pingUrl, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        if (res.statusCode === 200) {
            console.log('✅ Google Ping Successful!');
        } else if (res.statusCode === 404) {
            console.warn('⚠️  Google Ping Endpoint returned 404 (Deprecated). Ensure sitemap is in robots.txt.');
        } else {
            console.error('❌ Google Ping Failed.');
        }
    }).on('error', (e) => {
        console.error('❌ Error pinging Google:', e);
    });
};

// Argument handling
const args = process.argv.slice(2);
const mode = args[0];

if (mode === 'google') {
    pingGoogle();
} else if (mode === 'indexnow') {
    submitIndexNow();
} else {
    // Default: Both
    submitIndexNow();
    setTimeout(pingGoogle, 1000); // Small delay to separate logs
}
