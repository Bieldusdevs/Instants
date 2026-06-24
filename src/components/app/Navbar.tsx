"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Sparkles, Flame, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function Navbar() {
  const { user, setActiveTab } = useApp();
  const [showFireTooltip, setShowFireTooltip] = useState(false);

  const handleFireClick = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.1 },
      colors: ["#ff5500", "#ff8800", "#ffaa33", "#ffd700"],
    });
    setShowFireTooltip(true);
    setTimeout(() => setShowFireTooltip(false), 3000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-dark-bg/80 px-4 py-3 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-md items-center justify-between">
        {/* Logo moderno com efeito Shader Neon */}
        <div
          onClick={() => setActiveTab("feed")}
          className="cursor-pointer flex items-center space-x-2 select-none group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-fire via-fire-glow to-neon-purple p-0.5 shadow-[0_0_15px_rgba(255,85,0,0.4)] group-hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-dark-bg">
              <Sparkles className="h-4 w-4 text-fire-light animate-pulse" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
            Instants
          </span>
        </div>

        {/* Status direito: Foguinho TikTok style & Perfil */}
        <div className="flex items-center space-x-3">
          {user && (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFireClick}
                className="flex items-center space-x-1.5 rounded-full bg-fire/15 border border-fire/30 px-3 py-1 text-sm font-extrabold text-fire-light shadow-[0_0_12px_rgba(255,85,0,0.25)] backdrop-blur-md transition-all"
              >
                <Flame className="h-4 w-4 fill-fire text-fire animate-fire-flicker" />
                <span>{user.streak}</span>
              </motion.button>

              <AnimatePresence>
                {showFireTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 top-10 w-48 rounded-xl bg-dark-elevated border border-fire/40 p-2.5 text-center shadow-2xl backdrop-blur-xl z-50"
                  >
                    <p className="text-xs font-bold text-white">🔥 Ofensiva Suprema!</p>
                    <p className="text-[10px] text-neutral-300 mt-0.5">
                      Você partilhou Instants por {user.streak} dias seguidos! Continue assim.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Avatar Perfil Tab shortcut */}
          <button
            onClick={() => setActiveTab("profile")}
            className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20 bg-dark-card transition-all hover:border-fire/60 active:scale-95"
          >
            {user ? (
              <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-400">
                <UserIcon className="h-5 w-5" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
