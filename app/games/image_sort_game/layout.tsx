import type { Metadata } from "next";
import { Lusitana } from "next/font/google";
import "../globals.css";

const lusitana = Lusitana({ weight:"400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Classification Game",
  description: "A game in which the user clicks images and scores if they are members of a set",
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
