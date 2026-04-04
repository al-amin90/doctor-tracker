import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doctor Tracker",
  description: "Secure admin portal for managing doctors and patients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
