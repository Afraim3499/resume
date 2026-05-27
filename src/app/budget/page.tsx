import type { Metadata } from "next";
import BudgetPageClient from "./BudgetClient";

export const metadata: Metadata = {
  title: "Wealth Optimizer | Rizwanul Islam Afraim",
  description: "Personal wealth and budget optimization tools.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function BudgetPage() {
  return <BudgetPageClient />;
}
