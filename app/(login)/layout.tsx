import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import { redirect } from "next/navigation";
import sessionState from "@/lib/sessionState";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Practice",
  description: "Auth Practice app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await sessionState();
  if (!session) {
    redirect("/create-account");
  }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
