import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Providers } from "@/components/providers";
import { description, title } from "@/config/site";
import { cn } from "@/utils";
import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import LocalFont from "next/font/local";
import type {  PropsWithChildren } from "react";

const silka = LocalFont({
  src: [
    {
      path: "./fonts/silka-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/silka-medium-webfont.woff2",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/silka-semibold-webfont.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  display: "block",
  fallback: [ "Inter", "Helvetica Neue", "Helvetica", "sans-serif", "system-ui" ],
  variable: "--font-silka",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}
export const metadata: Metadata = {
  metadataBase: new URL("https://access-manager.cajun.tools"),
  title,
  description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    images: "/banner.png",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@openzeppelin",
    images: [ "/banner.png" ],
  },
};

const RootLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const locale = await getLocale();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(silka.variable)} suppressHydrationWarning>
        <main className="h-[100vh]">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
