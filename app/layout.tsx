import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import { Analytics } from "@vercel/analytics/react";
import ContextProvider from "../providers/ContextProvider";


const font = Figtree({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Quixote",
  description: "Gemini-1.5 Flash powered chatbot.",
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} w-full h-full`}>
        <ToasterProvider/>
        <ContextProvider>{children}</ContextProvider>
        <Analytics/>
      </body>
    </html>
  );
}
