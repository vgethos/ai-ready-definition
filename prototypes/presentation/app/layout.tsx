import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const hauss = localFont({
  src: [
    { path: "../public/fonts/Hauss-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Hauss-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Hauss-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
});

const cambon = localFont({
  src: [
    { path: "../public/fonts/Cambon-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Cambon-Demi.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "AI Demo — Ethos",
  description: "AI capabilities demo for the design and product team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hauss.variable} ${cambon.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
