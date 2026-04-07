import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import DialProvider from "@/components/DialProvider";
import AgentationProvider from "@/components/AgentationProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const portada = localFont({
  src: [
    { path: "../fonts/Portada-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Portada-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../fonts/Portada-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Insurability Report — Prototype",
  description: "Interactive prototype for insurability score report",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${portada.variable} font-sans antialiased`}
      >
        <DialProvider />
        <AgentationProvider />
        {children}
      </body>
    </html>
  );
}
