"use client";

import React, { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Registra o Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("PWA ServiceWorker registrado com sucesso:", reg.scope))
        .catch((err) => console.log("Erro no ServiceWorker:", err));
    }

    // Verifica se já está rodando como app standalone (tela cheia)
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsStandalone(true);
    }

    // Intercepta o prompt de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Mostra o banner apenas se não estiver no modo standalone e não tiver sido fechado antes
      if (!sessionStorage.getItem("pwa_banner_dismissed")) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Resultado da instalação PWA: ${outcome}`);
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("pwa_banner_dismissed", "true");
  };

  if (isStandalone || !showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-3 left-3 right-3 z-50 mx-auto max-w-md rounded-2xl bg-dark-card/90 border border-white/10 p-3.5 shadow-2xl backdrop-blur-xl flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fire to-fire-glow shadow-[0_0_12px_rgba(255,85,0,0.5)]">
            <Download className="h-5 w-5 text-white animate-bounce" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Instalar App Instants ✨</h4>
            <p className="text-xs text-neutral-400">Rápido, tela inteira e notificações offline</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstallClick}
            className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-dark-bg hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Instalar
          </button>
          <button
            onClick={dismissBanner}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
