import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

import { Room } from "./Room";
import cn from "@/lib/cn";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Figma Clone",
  description:
    "A minimalist Figma clone using Fabric.js and Liveblocks for real-time collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(workSans.className, "bg-primary-grey-200")}>
        <Room>{children}</Room>
      </body>
    </html>
  );
}
