import type { Metadata } from "next";
import OnboardingPageClient from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Onboarding | Rizwanul Islam Afraim",
  description: "Systems onboarding process.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function OnboardingPage() {
  return <OnboardingPageClient />;
}
