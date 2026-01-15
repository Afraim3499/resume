
"use client";

import { OnboardingWizard } from "@/components/budget/OnboardingWizard";
import { redirect } from "next/navigation";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white md:border border-gray-100 md:shadow-2xl md:rounded-[2.5rem] md:p-8 min-h-[600px] flex items-center">
                <OnboardingWizard onComplete={() => window.location.href = '/budget'} />
            </div>
        </div>
    );
}
