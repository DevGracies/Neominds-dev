import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "../context/ThemeProviderWrapper"
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HR SYSTEM",
  description: "Created by Grace Adegunle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
  suppressHydrationWarning
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <AuthProvider>
          <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
         </AuthProvider>
      </body>
    </html>
  );
}