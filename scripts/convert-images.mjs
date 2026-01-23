import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'public', 'assets');

async function convertImages() {
    if (!fs.existsSync(assetsDir)) {
        console.error(`Directory not found: ${assetsDir}`);
        return;
    }

    const files = fs.readdirSync(assetsDir);
    const images = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    console.log(`Found ${images.length} images to convert.`);

    for (const file of images) {
        const filePath = path.join(assetsDir, file);
        const fileName = path.parse(file).name;
        const outputFilePath = path.join(assetsDir, `${fileName}.webp`);

        try {
            if (fs.existsSync(outputFilePath)) {
                console.log(`Skipping ${file} - WebP already exists.`);
                continue;
            }

            console.log(`Converting ${file} to WebP...`);
            await sharp(filePath)
                .webp({ quality: 80 })
                .toFile(outputFilePath);
            console.log(`Converted ${file} to ${fileName}.webp`);
        } catch (error) {
            console.error(`Error converting ${file}:`, error.message);
            // Fallback if sharp is not installed or fails, we might just have to skip
            // but if this script runs via node, we expect sharp to be reachable if installed.
            // If not, I will install it temporarily.
        }
    }
}

convertImages();
