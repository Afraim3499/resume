import type { Metadata } from "next";
import LoginPageClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login | Rizwanul Islam Afraim",
  description: "Secure gateway for personal applications.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
