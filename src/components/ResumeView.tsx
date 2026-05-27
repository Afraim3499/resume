"use client";

import { Printer, MapPin, Mail, Link as LinkIcon, Phone, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EmailDisplay } from "./EmailDisplay";
import { useState, useCallback } from "react";

export function ResumeView() {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPDF = useCallback(async () => {
        setIsGenerating(true);
        try {
            // Dynamic import to avoid SSR issues with @react-pdf/renderer
            const { pdf } = await import("@react-pdf/renderer");
            const { ResumePDFDocument } = await import("./ResumePDF");
            const blob = await pdf(<ResumePDFDocument />).toBlob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Rizwanul_Islam_Afraim_CV.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("PDF generation failed:", err);
            // Fallback to browser print
            window.print();
        } finally {
            setIsGenerating(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-0 print:p-0 print:bg-white print:min-h-0">
            {/* Floating Action Button for Download */}
            <div className="fixed bottom-8 right-8 print:hidden z-50">
                <button
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-xl hover:bg-gray-800 transition-all font-medium disabled:opacity-60 disabled:cursor-wait"
                >
                    {isGenerating ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Download className="w-5 h-5" />
                    )}
                    <span>{isGenerating ? "Generating PDF…" : "Download PDF"}</span>
                </button>
            </div>

            {/* CV Pages Container */}
            <div id="resume-cv-content" className="max-w-[210mm] mx-auto space-y-8 print:space-y-0 print:max-w-none print:w-full">

                {/* PAGE 1 */}
                <div className="bg-white shadow-2xl print:shadow-none print:w-full print:max-w-none print:p-0 relative flex flex-col page-break-after-always print:h-[296mm] print:overflow-hidden">
                    <div className="p-10 md:p-12 print:p-[15mm] flex-1 flex flex-col">
                        {/* Header */}
                        <header className="border-b-2 border-gray-900 pb-3 mb-5 flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-0.5 tracking-tight">
                                    Rizwanul Islam Afraim
                                </h1>
                                <h2 className="text-sm md:text-base text-gray-700 font-bold mb-3 uppercase tracking-widest">
                                    Marketing Operations | Brand Execution | Digital Product
                                </h2>

                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <LinkIcon className="w-3 h-3" />
                                        <a href="https://www.rizwanulafraim.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            rizwanulafraim.com
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="w-3 h-3" />
                                        <EmailDisplay />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Phone className="w-3 h-3" />
                                        <span>01751-299259</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-3 h-3" />
                                        <span>Bashundhara R/A, Dhaka</span>
                                    </div>
                                </div>
                            </div>
                            {/* Profile Photo */}
                            <div className="relative w-16 h-16 flex-shrink-0">
                                <Image
                                    src="/assets/rizwanul-islam-afraim.webp"
                                    alt="Rizwanul Islam Afraim"
                                    width={64}
                                    height={64}
                                    className="object-cover rounded-full border-2 border-gray-100 shadow-sm"
                                    priority
                                />
                            </div>
                        </header>

                        {/* Profile */}
                        <section className="mb-5">
                            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-200 pb-1 mb-2">
                                Profile
                            </h3>
                            <p className="text-xs text-gray-700 leading-relaxed text-justify">
                                Marketing and operations professional with a BBA in Marketing and hands-on experience across market research, sales operations, campaign support, data operations, event coordination, and digital product development. Strong at connecting customer insight, execution planning, reporting, and digital systems to support business and brand growth. Experienced in company research, competitor analysis, lead generation, social media execution, backend data operations, and large-scale event coordination. Also has a working foundation in Next.js, React, Supabase/PostgreSQL, CMS systems, SEO, analytics, and full-stack digital platforms, helping bridge marketing execution with modern digital customer journeys.
                            </p>
                        </section>

                        {/* Highlights */}
                        <section className="mb-5">
                            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-200 pb-1 mb-2">
                                Highlights
                            </h3>
                            <ul className="space-y-1">
                                {[
                                    "2x Employee of the Month at PrimeSync for competitor analysis, AI product launch research, and organized industry lead support.",
                                    "Processed and managed 1M+ data points with accuracy across backend data operations at Quantanite.",
                                    "Coordinated 200+ people across major NSU cultural events including Boishakh, Boshonto, NSUSS Unplugged 2024, and Annual Cultural Evening of NSU.",
                                    "Supported high-crowd university event operations, including NSU Boishakh and Boshonto with 25,000+ audience scale.",
                                    "Built founder-led digital platforms involving CMS workflows, SEO, analytics, customer journeys, and AI-assisted support logic."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-2 text-xs text-gray-700 leading-snug">
                                        <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Professional Experience */}
                        <section className="mb-5">
                            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-200 pb-1 mb-3">
                                Professional Experience
                            </h3>

                            {/* Role 1: PrimeSync */}
                            <div className="mb-4">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="text-sm font-bold text-gray-900">Operations Associate</h4>
                                    <span className="text-[10px] text-gray-500 font-semibold uppercase">May 2024 – Present</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-xs font-semibold text-emerald-600">PrimeSync Solutions</span>
                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider">Dhaka, Bangladesh</span>
                                </div>
                                <p className="text-[10px] text-gray-500 mb-1 italic">
                                    PrimeSync Solutions provides outsourcing services including AI voice agents to reduce costs and improve productivity.
                                </p>
                                <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-snug">
                                    <li>Generate leads and research companies to identify qualified sales prospects.</li>
                                    <li>Conduct industry research, competitor tracking, and market analysis for sales and AI product initiatives.</li>
                                    <li>Organize industry leads and support outreach preparation for business development.</li>
                                    <li>Coordinate meeting slots and support sales operations workflows.</li>
                                    <li>Track weekly and monthly performance metrics for reporting and execution follow-up.</li>
                                </ul>
                            </div>

                            {/* Role 2: Quantanite */}
                            <div className="mb-4">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="text-sm font-bold text-gray-900">Associate</h4>
                                    <span className="text-[10px] text-gray-500 font-semibold uppercase">Feb 2022 – Apr 2024</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-xs font-semibold text-emerald-600">Quantanite</span>
                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider">Remote</span>
                                </div>
                                <p className="text-[10px] text-gray-500 mb-1 italic">
                                    CX and digital outsourcing solutions provider for fast-growing companies.
                                </p>
                                <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-snug">
                                    <li>Processed, scraped, and entered 1M+ data points with high accuracy.</li>
                                    <li>Uploaded and managed backend content including photos and structured data.</li>
                                    <li>Corrected data entry errors and maintained quality across repetitive operational workflows.</li>
                                    <li>Identified training needs and supported process improvement for better team efficiency.</li>
                                </ul>
                            </div>

                            {/* Role 3: Serial Griller */}
                            <div>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="text-sm font-bold text-gray-900">Organic Social Media Marketer</h4>
                                    <span className="text-[10px] text-gray-500 font-semibold uppercase">Jul 2018 – Sep 2018</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-xs font-semibold text-emerald-600">The Serial Griller</span>
                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider">Chattogram</span>
                                </div>
                                <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-snug">
                                    <li>Managed food content posting, customer reviews, and story/rating updates in food communities.</li>
                                    <li>Tracked competitor social media activity and adjusted posting strategy accordingly.</li>
                                    <li>Supported local customer engagement through organic social media activity.</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>

                {/* PAGE 2 */}
                <div className="bg-white shadow-2xl print:shadow-none print:w-full print:max-w-none print:p-0 relative flex flex-col print:h-[296mm] print:overflow-hidden">
                    <div className="p-10 md:p-12 print:p-[15mm] flex-1 flex flex-col">
                        {/* Leadership */}
                        <section className="mb-6">
                            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-200 pb-1 mb-2">
                                Leadership & Event Coordination
                            </h3>
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-[13px] font-bold text-gray-900">NSU Shangskritik Shangathan (NSUSS)</h4>
                                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Vice President of Programs</span>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-snug">
                                <li>Coordinated teams, volunteers, artists, vendors, logistics, and event flow across major university cultural events.</li>
                                <li>Worked across NSU Boishakh, Boshonto, NSUSS Unplugged 2024, and Annual Cultural Evening of NSU.</li>
                                <li>Supported execution for high-crowd university events including NSU Boishakh and Boshonto, which reached 25,000+ audience scale.</li>
                                <li>Built practical experience relevant to BTL activation, product launch support, field coordination, and stakeholder communication.</li>
                            </ul>
                        </section>

                        {/* Key Projects */}
                        <section className="mb-6">
                            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-200 pb-1 mb-3">
                                Key Projects
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-0.5">
                                        <h4 className="text-sm font-bold text-gray-900">Gaari</h4>
                                        <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">gaaribd.com — Premium Mobility Platform</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-snug">
                                        <li>Built and managed a digital mobility platform involving customer journey planning, booking flow, service presentation, and payment logic.</li>
                                        <li>Engineered &ldquo;Gaariwala,&rdquo; an AI customer support agent using NLP to reduce repetitive support workload.</li>
                                        <li>Applied SEO, digital service positioning, and operational planning to support growth of the platform.</li>
                                    </ul>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-0.5">
                                        <h4 className="text-sm font-bold text-gray-900">The Trail / Content Systems</h4>
                                        <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">trailheadlines.com — Intelligent News Platform</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-snug">
                                        <li>Built a content platform with CMS workflows, SEO, analytics, editorial structure, and performance-focused publishing.</li>
                                        <li>Designed digital content systems to support high-volume communication and audience engagement.</li>
                                        <li>Improved understanding of content strategy, digital publishing, brand consistency, and real-time topic tracking.</li>
                                    </ul>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-0.5">
                                        <h4 className="text-sm font-bold text-gray-900">Yagacalls</h4>
                                        <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">Digital Communication / Community Platform</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-xs leading-snug">
                                        <li>Worked on platform structure, customer communication logic, content architecture, and digital growth systems.</li>
                                        <li>Applied SEO/AEO/GEO thinking, landing page structure, and user journey planning.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section className="mb-6">
                            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-200 pb-1 mb-2">
                                Education
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-[13px] font-bold text-gray-900">North South University</h4>
                                    <p className="text-xs text-emerald-600 font-semibold leading-tight">BBA, Major in Marketing (2019 – 2025)</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-tight">Consumer Behavior, Market Research, Strategy</p>
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold text-gray-900">Halishahar Cantonment Public</h4>
                                    <p className="text-xs text-gray-700 font-semibold">Higher Secondary Certificate (2018)</p>
                                </div>
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="mb-6">
                            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-200 pb-1 mb-3">
                                Skills
                            </h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <h4 className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Marketing & Brand</h4>
                                    <ul className="space-y-0.5 text-xs text-gray-700">
                                        <li>• Market Research</li>
                                        <li>• Competitor Analysis</li>
                                        <li>• Brand Support</li>
                                        <li>• Campaign Execution</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Operations</h4>
                                    <ul className="space-y-0.5 text-xs text-gray-700">
                                        <li>• Lead Generation</li>
                                        <li>• Sales Operations</li>
                                        <li>• Performance Tracking</li>
                                        <li>• Reporting & CRM</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Digital & Tech</h4>
                                    <ul className="space-y-0.5 text-xs text-gray-700">
                                        <li>• Next.js / React</li>
                                        <li>• SEO & Analytics</li>
                                        <li>• CMS Systems</li>
                                        <li>• AI-Assisted Tools</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Execution</h4>
                                    <ul className="space-y-0.5 text-xs text-gray-700">
                                        <li>• Event Operations</li>
                                        <li>• Team Coordination</li>
                                        <li>• Logistics Support</li>
                                        <li>• Stakeholder Mgmt</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Certifications */}
                        <section className="mb-6">
                            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-200 pb-1 mb-2">
                                Certifications & Interests
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
                                <ul className="space-y-0.5">
                                    <li>• Search Engine Optimization (SEO) Assessment — LinkedIn</li>
                                    <li>• Microsoft PowerPoint Assessment — LinkedIn</li>
                                    <li>• Excel Bootcamp — NSU CPC</li>
                                </ul>
                                <p className="italic text-gray-500 text-[11px]">
                                    <strong className="text-gray-700 not-italic">Interest:</strong> Building digital products, AI-assisted workflows, and scalable digital systems.
                                </p>
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="mt-auto pt-4 border-t border-gray-200 text-center page-footer">
                            <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-[0.3em]">
                                Rizwanul Islam Afraim • Marketing Operations • Brand Execution • Digital Product
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
            
            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0;
                        size: A4;
                    }
                    .page-break-after-always {
                        page-break-after: always !important;
                        break-after: page !important;
                    }
                }
            `}</style>
        </div>
    );
}
