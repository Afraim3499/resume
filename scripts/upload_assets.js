/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const BUCKET_NAME = 'portfolio-images';
const ASSETS_DIR = path.resolve(__dirname, '../hq-assets');

async function uploadAssets() {
    console.log(`Checking bucket '${BUCKET_NAME}'...`);

    // 1. Check/Create Bucket
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) {
        console.error('Error listing buckets:', listError);
        process.exit(1);
    }

    const bucketExists = buckets.find(b => b.name === BUCKET_NAME);
    if (!bucketExists) {
        console.log(`Bucket '${BUCKET_NAME}' does not exist. Creating...`);
        const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
            public: true,
            fileSizeLimit: 10485760, // 10MB
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/jpg']
        });

        if (createError) {
            console.error('Error creating bucket:', createError);
            process.exit(1);
        }
        console.log(`Bucket '${BUCKET_NAME}' created.`);
    } else {
        console.log(`Bucket '${BUCKET_NAME}' exists.`);
    }

    // 2. Read contents of hq-assets
    if (!fs.existsSync(ASSETS_DIR)) {
        console.error(`Directory ${ASSETS_DIR} does not exist.`);
        process.exit(1);
    }

    const files = fs.readdirSync(ASSETS_DIR);
    if (files.length === 0) {
        console.log('No files found in hq-assets.');
        return;
    }

    console.log(`Found ${files.length} files to upload.`);
    const uploadedUrls = {};

    for (const file of files) {
        if (file === '.gitkeep') continue;

        const filePath = path.join(ASSETS_DIR, file);
        const fileBuffer = fs.readFileSync(filePath);
        const contentType = getContentType(file);

        console.log(`Uploading ${file}...`);

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(file, fileBuffer, {
                contentType,
                upsert: true
            });

        if (error) {
            console.error(`Failed to upload ${file}:`, error.message);
        } else {
            const { data: publicUrlData } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(file);

            console.log(`Uploaded ${file} -> ${publicUrlData.publicUrl}`);
            uploadedUrls[file] = publicUrlData.publicUrl;
        }
    }

    console.log('\n--- Upload Summary ---');
    console.log(JSON.stringify(uploadedUrls, null, 2));
}

function getContentType(filename) {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
        case '.png': return 'image/png';
        case '.jpg':
        case '.jpeg': return 'image/jpeg';
        case '.webp': return 'image/webp';
        case '.svg': return 'image/svg+xml';
        default: return 'application/octet-stream';
    }
}

uploadAssets().catch(console.error);
