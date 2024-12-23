import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Somnio challenge | Mateo Lorenzo",
  description: "Somnio challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable} style={{ backgroundColor: "#f5f5f5" }}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
