import { faqData } from "@/data/faq";

export interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export function getAllFAQs(): FAQItem[] {
    return faqData;
}

export function getFAQsByCategory(category: string): FAQItem[] {
    return faqData.filter(faq => faq.category === category);
}
