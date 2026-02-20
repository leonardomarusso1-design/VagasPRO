import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "VagasPRO - Gerador de Currículos IA",
  description: "Gerador de Currículos com Inteligência Artificial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans bg-slate-950 text-slate-50 antialiased selection:bg-blue-500 selection:text-white`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
