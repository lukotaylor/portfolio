import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: "Taylor's Portfolio",
  description: "Product designer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600&family=Noto+Sans:wght@400;500;600&family=Lexend:wght@400;500;600&family=Work+Sans:wght@400;500;600&family=Sanchez:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
