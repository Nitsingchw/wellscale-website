import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorGlow } from "@/components/cursor-glow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WellScale — Performance Marketing for Aesthetic Clinics | 3X Revenue in 30 Days",
  description:
    "WellScale is a performance marketing agency for aesthetic clinics. We engineer patient pipelines that scale your revenue 3X in 30 days. Meta Ads, Walk-in Campaigns, WhatsApp Nurturing, GMB Ranking, Sales Training.",
  keywords: [
    "performance marketing agency",
    "aesthetic clinic marketing",
    "Meta ads for clinics",
    "ROAS optimization",
    "patient acquisition",
    "clinic revenue growth",
    "WellScale",
  ],
  authors: [{ name: "WellScale" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "WellScale — Scale Your Aesthetic Clinic",
    description:
      "3X revenue in 30 days — or we work free. Performance marketing for aesthetic clinics.",
    siteName: "WellScale",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WellScale — Scale Your Aesthetic Clinic",
    description:
      "3X revenue in 30 days — or we work free. Performance marketing for aesthetic clinics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <CursorGlow />
        </ThemeProvider>
      </body>
    </html>
  );
}
