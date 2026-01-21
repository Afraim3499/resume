
import fs from 'fs';
import path from 'path';

export interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const contentPath = path.join(process.cwd(), 'src/content/faq.json');

export function getAllFAQs(): FAQItem[] {
    if (!fs.existsSync(contentPath)) {
        return [];
    }

    const fileContents = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(fileContents);
}

export function getFAQsByCategory(category: string): FAQItem[] {
    const faqs = getAllFAQs();
    return faqs.filter(faq => faq.category === category);
}
