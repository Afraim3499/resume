import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wealth Optimizer",
    description: "Personal Finance Command Center",
    manifest: "/budget-manifest.json",
};

export default function BudgetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
