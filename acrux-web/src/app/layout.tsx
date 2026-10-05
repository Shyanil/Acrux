import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gotham = localFont({
  src: [
    {
      path: "../fonts/GothamBook.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Gotham Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-gotham",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://acruxrealcon.in"),
  title: "ACRUX AAKAAR | Ultra-Luxury 2.5 & 3 BHK Residences | Patia, Bhubaneswar",
  description:
    "A Living Masterpiece Awaits. Acrux Aakaar offers 556 ultra-luxury apartments across 5 iconic towers (B+S+21) with 60% open spaces in Chandrasekharpur, Patia, Bhubaneswar by Acrux Realcon.",
  keywords: [
    "Acrux Aakaar",
    "Acrux Realcon",
    "Luxury Apartments Bhubaneswar",
    "Flats in Patia Bhubaneswar",
    "3 BHK in Patia",
    "2.5 BHK in Patia",
    "Bhubaneswar Real Estate",
  ],
  icons: {
    icon: [{ url: "/fav-icon.webp", type: "image/webp" }],
    shortcut: "/fav-icon.webp",
    apple: "/fav-icon.webp",
  },
  openGraph: {
    title: "ACRUX AAKAAR | Ultra-Luxury 2.5 & 3 BHK Residences",
    description: "556 Apartments | 5 Towers | B+S+21 | 60% Open Space in Patia, Bhubaneswar.",
    images: ["/assets/Project/Master_Elevation.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gotham.variable} scroll-smooth`}>
      <body className="font-sans bg-white text-[#222222] antialiased selection:bg-[#976932] selection:text-white">
        {children}
      </body>
    </html>
  );
}
