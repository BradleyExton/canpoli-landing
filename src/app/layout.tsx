import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Civic Context API — Canadian Political Data",
  description:
    "Free API for Canadian elected representatives. Get federal MPs, provincial MLAs, and municipal councillors for any location.",
  keywords: [
    "Canada",
    "API",
    "civic",
    "representatives",
    "MP",
    "MLA",
    "MPP",
    "councillor",
    "politics",
    "government",
    "federal",
    "provincial",
    "municipal",
  ],
  openGraph: {
    title: "Civic Context API — Canadian Political Data",
    description: "Free API for Canadian civic data",
    url: "https://canpoli.dev",
    type: "website",
    siteName: "canpoli.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Civic Context API — Canadian Political Data",
    description: "Free API for Canadian elected representatives",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${fraunces.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
