import type { Metadata } from "next";
import { Lusitana } from "next/font/google";
import "./globals.css";

const lusitana = Lusitana({ weight:"400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.nationalrecordingregistry.net`),
  title: "National Recording Registry",
  description: "A deep dive into America's audio legacy - with the dev's portfolio attached for their convenience.",
  alternates: {
      canonical: './',
  }
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
