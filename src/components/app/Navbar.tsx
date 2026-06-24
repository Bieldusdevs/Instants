"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Sparkles, PawPrint, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function Navbar() {
  const { user, pet, setActiveTab } = useApp();

  const handlePetClick = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.1 },
      colors: ["#ff5500", "#00f0ff", "#ffd700"],
    });
    setActiveTab("pet");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-dark-bg/80 px-4 py-3 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-md items-center justify-between">
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

        <div className="flex items-center space-x-3">
          {user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePetClick}
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-fire/20 to-neon-purple/20 border border-fire/40 px-3 py-1 text-xs font-extrabold text-white shadow-[0_0_12px_rgba(255,85,0,0.25)] backdrop-blur-md transition-all"
            >
              <PawPrint className="h-4 w-4 text-fire animate-bounce" />
              <span>{pet.name} (Nvl {pet.level})</span>
            </motion.button>
          )}

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
