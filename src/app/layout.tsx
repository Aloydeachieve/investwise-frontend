import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import { Inter } from 'next/font/google'
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { ToastProvider } from "@/contexts/ToastContext";
import { AuthProvider } from '@/contexts/AuthContext';

// const inter = Inter({ subsets: ['latin'] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvestWise - Secure Investments for Your Future",
  description:
    "InvestWise is a platform for secure investments and wealth management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ToastProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </body>
      </html>
    </ToastProvider>
  );
}
