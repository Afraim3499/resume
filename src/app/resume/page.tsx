import { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";

export const metadata: Metadata = {
    title: "Resume | Rizwanul Islam - Advanced Venture Architect & Operations Expert",
    description: "Professional resume of Rizwanul Islam (Afraim). Advanced Venture Architect managing 1M+ data points and building scalable platform unicorns like Gaari.",
    alternates: {
        canonical: "/resume",
    },
    openGraph: {
        title: "Resume | Rizwanul Islam - Advanced Venture Architect",
        description: "Professional resume of Rizwanul Islam (Afraim). Operations Expert building scalable platform unicorns.",
    }
};

export default function ResumePage() {
    return <ResumeView />;
}
