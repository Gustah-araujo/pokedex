import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex by Gustavo Araújo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR">
      <body className={inter.className}>
        
        <header className="w-full bg-gray-100 py-4 px-10">
          <h2 className="text-black">
            <a href="/">
                Pokedex
            </a>
          </h2>
        </header>

        <main className="py-10 sm:px-10 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
