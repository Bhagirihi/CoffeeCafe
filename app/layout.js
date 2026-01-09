import "./globals.css";
import Script from "next/script";
import { DM_Sans, Forum } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

const forum = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-forum",
});

export const metadata = {
  title: "Le Crumb - Bakery & Pastry Shop",
  description:
    "Le Crumb is a bakery and pastry shop that offers a wide range of bread, cakes, and pastries. We are committed to using the best ingredients and traditional recipes to create delicious and high-quality products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${dmSans.variable} ${forum.variable}`}>
        {children}
        <Script
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
          type="module"
          strategy="afterInteractive"
        />
        <Script
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
          noModule
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
