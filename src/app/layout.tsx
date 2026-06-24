import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PwaRegister } from "@/components/pwa/PwaRegister";

export const metadata: Metadata = {
  title: "Instants ✨ - Partilhe Fotos e Vídeos Aleatórios",
  description: "PWA moderno de Instants com chat, reações instantâneas e ofensiva de fogo 🔥 estilo BeReal/TikTok",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Instants",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="bg-dark-bg text-white antialiased min-h-screen selection:bg-fire selection:text-white">
        <Providers>
          <CustomCursor />
          <PwaRegister />
          {children}
        </Providers>
      </body>
    </html>
  );
}
