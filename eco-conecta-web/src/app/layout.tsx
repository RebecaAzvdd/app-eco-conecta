import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/poppins"; // padrão 400
import "@fontsource/poppins/600.css"; // peso extra, opcional

export const metadata: Metadata = {
  title: "Eco Conecta",
  description: "Eco Conecta - Connecting People and Nature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
