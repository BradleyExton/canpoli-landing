import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, DM_Mono, Fraunces } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AnalyticsListener } from "@/components/chrome/AnalyticsListener";
import { ConsentBanner } from "@/components/chrome/ConsentBanner";
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
  metadataBase: new URL("https://canpoli.dev"),
  title: "CanPoli API — Canadian MP Data",
  description:
    "Canadian Political Data API for federal MPs, ridings, and parties. Lookup by coordinates or browse filterable lists.",
  keywords: [
    "Canada",
    "API",
    "MP",
    "House of Commons",
    "riding",
    "party",
    "politics",
    "government",
    "federal",
    "representatives",
  ],
  openGraph: {
    title: "CanPoli API — Canadian MP Data",
    description: "Canadian Political Data API for federal MPs, ridings, and parties",
    url: "https://canpoli.dev",
    type: "website",
    siteName: "canpoli.dev",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CanPoli API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CanPoli API — Canadian MP Data",
    description: "Canadian Political Data API for federal MPs, ridings, and parties",
    images: ["/og.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className="scroll-smooth">
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', { analytics_storage: 'denied' });
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                debug_mode: ${!isProd},
              });
            `}
          </Script>
        </>
      )}
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${fraunces.variable} antialiased`}
      >
        <ClerkProvider>
          {children}
          <AnalyticsListener />
          {gaId && <ConsentBanner />}
        </ClerkProvider>
      </body>
    </html>
  );
}
