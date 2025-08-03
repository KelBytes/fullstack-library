import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// This file is the root layout of the application.
// It imports global styles, local fonts, and various components for notifications and analytics.
// The `metadata` object defines the title and description of the application.
// The `RootLayout` component wraps the application in a session provider and includes the main content.
// It also includes the Toaster component for displaying notifications, Analytics for tracking user interactions,
// and SpeedInsights for performance monitoring.
// The local fonts are imported using the `localFont` function, which allows for custom fonts to be used throughout the application.
// The `RootLayout` component is exported as the default export of the module.

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "/fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a university library management solution.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${ibmPlexSans.className} ${bebasNeue.variable}`}>
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </SessionProvider>
    </html>
  );
}
