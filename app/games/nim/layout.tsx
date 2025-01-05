import type { Metadata } from "next";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({ weight:"400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NRR Games - Nim",
    description: "The classic, long-solved two-player game of Nim"
  };

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className={lusitana.className}>{children}</body>
      </html>
    );
  }