"use client";

import { Printer, MapPin, Mail, Link as LinkIcon, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EmailDisplay } from "./EmailDisplay";

export function ResumeView() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-0">
            {/* Floating Action Button for Print - Hidden in Print Mode */}
            <div className="fixed bottom-8 right-8 print:hidden z-50">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-xl hover:bg-gray-800 transition-all font-medium"
                >
                    <Printer className="w-5 h-5" />
                    <span>Download / Print PDF</span>
                </button>
            </div>

            {/* A4 Paper Container */}
            <div className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none print:w-full print:max-w-none print:p-0 min-h-[297mm] relative">
                <div className="p-12 md:p-16 print:p-[20mm]">

                    {/* Header */}
                    <header className="border-b-2 border-gray-900 pb-4 mb-4 flex justify-between items-start gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-1 tracking-tight">
                                Rizwanul Islam Afraim
                            </h1>
                            <h2 className="text-lg text-gray-600 font-medium mb-4 uppercase tracking-wider">
                                Marketing and Sales Operations | Product Founder
                            </h2>

                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <LinkIcon className="w-3.5 h-3.5" />
                                    <Link href="https://www.rizwanulafraim.com" className="hover:underline">
                                        rizwanulafraim.com
                                    </Link>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    <EmailDisplay />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5" />
                                    <span>01751-299259</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>Bashundhara R/A, Dhaka</span>
                                </div>
                            </div>
                        </div>
                        {/* Profile Photo */}
                        <div className="relative w-24 h-24 flex-shrink-0">
                            <Image
                                src="/assets/rizwanul-islam-afraim.webp"
                                alt="Rizwanul Islam Afraim"
                                width={96}
                                height={96}
                                className="object-cover rounded-full border-2 border-gray-100 shadow-sm"
                                priority
                            />
                        </div>
                    </header>

                    {/* Executive Profile */}
                    <section className="mb-4 break-inside-avoid">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">
                            Profile
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">
                            Dynamic Market Researcher and Business Development Professional with expertise in data-driven decision-making and customer experience optimization. Proven track record at PrimeSync Solutions and Quantanite, specializing in market research, data analysis, and strategic planning. As Founder of Gaari and Vice President of NSU Shangskritik Shangathan, demonstrated effective leadership by managing large-scale projects and delivering impactful results that drive business growth.
                        </p>
                    </section>

                    {/* Highlights & Certifications (Combined for Compactness) */}
                    <section className="mb-4 break-inside-avoid">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">
                                    Highlights
                                </h3>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-sm">
                                    <li><strong>Employee of the Month (PrimeSync):</strong> Recognized twice for high-quality competitor analysis for AI product launches and organizing industry leads for sales outreach.</li>
                                    <li><strong>Event Management:</strong> Managed 200+ people and organized 12+ mid-sized events as VP of NSUSS.</li>
                                    <li><strong>Artist Management:</strong> Managed teams for Atif Aslam and King at Let&apos;s Vibe Festival, handling logistics and event flow.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">
                                    Certifications & Interests
                                </h3>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-sm">
                                    <li>Search Engine Optimization (SEO) Assessment (LinkedIn)</li>
                                    <li>Microsoft PowerPoint Assessment (LinkedIn)</li>
                                    <li>Excel Bootcamp (NSU CPC)</li>
                                    <li><strong>Interest:</strong> Developing digital products with Unity/Unreal Engine; exploring global opportunities for Bangladesh in the game dev sector.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Professional Experience */}
                    <section className="mb-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">
                            Professional Experience
                        </h3>

                        {/* Role 1: PrimeSync */}
                        <div className="mb-4 break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-md font-bold text-gray-900">Operations Associate</h4>
                                <span className="text-sm text-gray-500 font-medium">May 2024 - Present</span>
                            </div>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-sm font-medium text-gray-700">PrimeSync Solutions</span>
                                <span className="text-xs text-gray-500">Remote</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-1 italic">Company Overview: PrimeSync Solutions provides outsourcing services including AI voice agents to save costs and enhance productivity.</p>
                            <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-sm">
                                <li>Generate leads and research companies to identify new sales prospects.</li>
                                <li>Conduct industry analysis and manage meeting slots for sales operations.</li>
                                <li>Track performance metrics weekly and monthly.</li>
                            </ul>
                        </div>

                        {/* Role 2: Quantanite */}
                        <div className="mb-4 break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-md font-bold text-gray-900">Associate</h4>
                                <span className="text-sm text-gray-500 font-medium">Feb 2022 - Apr 2024</span>
                            </div>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-sm font-medium text-gray-700">Quantanite</span>
                                <span className="text-xs text-gray-500">Remote</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-1 italic">Company Overview: CX and digital outsourcing solutions provider for fast-growing companies.</p>
                            <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-sm">
                                <li>Scraped data and entered 1+ million data points with high accuracy.</li>
                                <li>Uploaded photos on backend systems and corrected data entry errors.</li>
                                <li>Identified training needs for efficient process optimization.</li>
                            </ul>
                        </div>

                        {/* Role 3: Serial Griller */}
                        <div className="mb-2 break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-md font-bold text-gray-900">Organic Social Media Marketer</h4>
                                <span className="text-sm text-gray-500 font-medium">Jul 2018 - Sep 2018</span>
                            </div>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-sm font-medium text-gray-700">The Serial Griller</span>
                                <span className="text-xs text-gray-500">Chattogram</span>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-sm">
                                <li>Managed food posting, collected reviews, and posted stories/ratings in food groups.</li>
                                <li>Tracked competitors&apos; social media and adjusted marketing strategies accordingly.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Key Projects - SEPARATED FOR IMPACT */}
                    <section className="mb-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">
                            Key Projects (Founder & Lead Architect)
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Project 1: Gaari */}
                            <div className="break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <Link href="https://gaaribd.com" target="_blank" className="hover:underline flex items-center gap-1">
                                        <h4 className="text-md font-bold text-gray-900">Gaari</h4>
                                        <LinkIcon className="w-3 h-3 text-gray-400" />
                                    </Link>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">
                                    <Link href="https://gaaribd.com" className="hover:underline text-blue-600">gaaribd.com</Link> — Premium Mobility Ecosystem
                                </p>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-sm leading-relaxed">
                                    <li>Founded and built a comprehensive mobility platform with <strong>Next.js</strong> &amp; <strong>Stripe</strong>.</li>
                                    <li>Engineered &quot;Gaariwala&quot;, an <strong>AI Customer Agent</strong> using NLP that reduced support volume by 80%.</li>
                                    <li>Managed business strategy, reducing operational costs while scaling the digital fleet.</li>
                                </ul>
                            </div>

                            {/* Project 2: The Trail */}
                            <div className="break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <Link href="https://trailheadlines.com" target="_blank" className="hover:underline flex items-center gap-1">
                                        <h4 className="text-md font-bold text-gray-900">The Trail</h4>
                                        <LinkIcon className="w-3 h-3 text-gray-400" />
                                    </Link>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">
                                    <Link href="https://trailheadlines.com" className="hover:underline text-blue-600">trailheadlines.com</Link> — Intelligent News Platform
                                </p>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 text-sm leading-relaxed">
                                    <li>Architected a high-performance news aggregator with a custom <strong>Content Management System (CMS)</strong>.</li>
                                    <li>Implemented advanced <strong>SEO & Analytics</strong> pipelines to track trending topics real-time.</li>
                                    <li>Designed the full-stack architecture using Supabase and modern caching strategies.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    {/* Competencies & Education Grid */}
                    <section className="mb-6 break-inside-avoid">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">
                            Education & Skills
                        </h3>
                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Education</h4>
                                <div className="mb-3">
                                    <p className="font-bold text-gray-900">North South University</p>
                                    <p className="text-gray-900">BBA, Major in Marketing (2019 - 2025)</p>
                                    <p className="text-xs text-gray-500">Focus: Service Marketing, Consumer Behavior</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Halishahar Cantonment Public</p>
                                    <p className="text-gray-900">H.S.C (2018)</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Skills</h4>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <ul className="space-y-1 text-gray-700">
                                        <li>• Strategic Marketing</li>
                                        <li>• Market Research</li>
                                        <li>• Consumer Behavior</li>
                                        <li>• Communications</li>
                                    </ul>
                                    <ul className="space-y-1 text-gray-700">
                                        <li>• Next.js / React (Tech)</li>
                                        <li>• SEO & Analytics</li>
                                        <li>• Team Leadership</li>
                                        <li>• Planning & Execution</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body {
            background: white;
          }
          /* Hide non-printable elements */
          nav, footer, button, .no-print {
            display: none !important;
          }
          /* Prevent awkward breaks */
          .break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          section {
            break-inside: auto;
          }
        }
      `}</style>
        </div>
    );
}
