import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { DialRoot } from "dialkit";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AI Office Hours Bingo",
  description: "Interactive bingo board for AI Office Hours Q&A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {children}
        <DialRoot position="top-left" />
      </body>
    </html>
  );
}
