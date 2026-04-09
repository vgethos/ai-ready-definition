import type { Metadata } from "next";
import localFont from "next/font/local";
import DialProvider from "@/components/DialProvider";
import AgentationProvider from "@/components/AgentationProvider";
import "./globals.css";

const hauss = localFont({
  src: [
    { path: "../fonts/Hauss-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Hauss-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Hauss-Bold.woff2", weight: "700", style: "normal" },
  ],
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
        className={`${hauss.variable} ${portada.variable} font-sans antialiased`}
      >
        <DialProvider />
        <AgentationProvider />
        {children}
      </body>
    </html>
  );
}
