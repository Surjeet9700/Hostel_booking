import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConvexCLientProvider } from "@/components/providers/convex-providers";
import { ThemeProvider } from "@/components/providers/theme-providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hostel Booking",
  description: "Book hostel rooms and more",
  icons:[
    {
      media: "(prefers-color-scheme: light)",
      url: "/logo.svg",
      href: "/logo.svg"
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/logo-dark.svg",
      href: "/logo-dark.svg"
    }

  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider 
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="jotion-theme-2"
        >
            <ConvexCLientProvider>
                  {children}
              </ConvexCLientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
