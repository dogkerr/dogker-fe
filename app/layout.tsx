import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ProgressBarProvider from "@/components/progress-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Dogker",
    default: "Dogker", // a default is required when creating a template
  },
  description:
    "The Ultimate Container as a Service Solution for Developers and DevOps Teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${inter.className}`}>
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
