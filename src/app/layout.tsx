import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Valentine's Quest 💕",
  description:
    "A special Valentine's Date adventure — choose, explore, and capture every beautiful moment together.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F5EDE4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          backgroundColor: "#F5EDE4",
        }}
      >
        <div className="min-h-screen max-w-md mx-auto relative">
          {children}
        </div>
      </body>
    </html>
  );
}
