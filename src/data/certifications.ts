export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerUrl?: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export const certifications: Certification[] = [
  // Add certifications here when available
  // Example structure:
  // {
  //   id: "nextjs-cert",
  //   name: "Next.js Certified Developer",
  //   issuer: "Vercel",
  //   issuerUrl: "https://vercel.com",
  //   issueDate: "2024-01-15",
  //   credentialId: "ABC123",
  //   credentialUrl: "https://vercel.com/cert/abc123",
  //   description: "Certified in Next.js App Router and Server Components",
  // },
];

