import { Metadata } from "next";
import { ArrowRight, Code, Target, Zap } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "বাংলা | Rizwanul Islam (Afraim)",
    description: "রিজওয়ানুল ইসলাম (আফরাহিম) - একজন ভেঞ্চার আর্কিটেক্ট এবং ডিজিটাল স্ট্র্যাটেজিস্ট। বিশৃঙ্খলা থেকে লাভজনক টেক প্ল্যাটফর্ম তৈরি করুন।",
};

export default function BengaliPage() {
    return (
        <main className="bg-background min-h-screen text-foreground pt-32 pb-24">
            <div className="container px-4 mx-auto max-w-4xl">
                <Breadcrumbs
                    items={[
                        { label: "বাংলা" },
                    ]}
                />
                <div className="text-center mb-16 mt-8">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        আপনার ভিশন <span className="text-red-500/90 dark:text-red-400">বিশৃঙ্খলা</span>।<br />
                        আমি এটিকে <span className="text-emerald-600 dark:text-emerald-400">মুনাফায়</span> পরিণত করি।
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                        কৌশলগত পরিকল্পনা থেকে শুরু করে সিস্টেম ডিপ্লয়মেন্ট পর্যন্ত, আমি অগোছালো ধারণাগুলোকে একটি শক্তিশালী টেক প্ল্যাটফর্মে পরিণত করি। অর্ধেক খরচে দ্বিগুণ পণ্যের গুণগত মান পান, আপনার দিক থেকে কোনো ঝামেলা ছাড়াই।
                    </p>
                    <div className="mt-8 relative inline-block group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-emerald-500/50 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <a
                            href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-medium text-lg shadow-xl shadow-primary/20 hover:scale-105"
                        >
                            পরামর্শের জন্য বুক করুন <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-foreground/10 hover:border-primary/50 transition-colors">
                        <Zap className="w-10 h-10 text-emerald-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">দ্রুত ডেলিভারি</h3>
                        <p className="text-foreground/70">সাধারণ এজেন্সির তুলনায় কয়েক মাস আগেই পণ্য বাজারে নিয়ে আসুন। কার্যকরী স্বয়ংক্রিয়তার মাধ্যমে আমরা সময় বাঁচাই।</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-foreground/10 hover:border-primary/50 transition-colors">
                        <Target className="w-10 h-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">ব্যবসায়িক ফোকাস</h3>
                        <p className="text-foreground/70">শুধুমাত্র কোড নয়, আপনার ব্যবসার মূল লক্ষ্য এবং আরওএএস (ROAS) এর উপর দৃষ্টি নিবদ্ধ করে সিস্টেম ডিজাইন করা হয়।</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-foreground/10 hover:border-primary/50 transition-colors">
                        <Code className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">টেকসই আর্কিটেকচার</h3>
                        <p className="text-foreground/70">নেক্সট.জেএস (Next.js), এবং আধুনিক স্ট্যাক ব্যবহার করে স্কেলেবল এবং ভবিষ্যৎ-প্রস্তুত কোডবেস।</p>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-foreground/10">
                    <h2 className="text-2xl font-bold mb-6">আমার কাজগুলো এক্সপ্লোর করুন</h2>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-foreground/5 text-foreground/80 hover:bg-foreground/10 border border-foreground/10 transition-colors hover:scale-105"
                    >
                        পোর্টফোলিও দেখুন
                    </Link>
                </div>
            </div>
        </main>
    );
}
