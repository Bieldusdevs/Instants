"use client";

import React from "react";
import { useApp } from "../providers/Providers";
import { Compass, Camera, MessageCircle, PawPrint, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const { activeTab, setActiveTab, chats } = useApp();

  const unreadMessagesCount = chats.reduce((acc: number, c: any) => acc + c.unreadCount, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-dark-bg/90 pb-safe backdrop-blur-2xl">
      <div className="mx-auto flex max-w-md items-center justify-around px-1 py-2">
        <button onClick={() => setActiveTab("feed")} className="flex flex-1 flex-col items-center justify-center py-1 text-neutral-400 hover:text-white">
          <Compass className={`h-5 w-5 ${activeTab === "feed" ? "text-white scale-110" : ""}`} />
          <span className={`text-[10px] mt-1 ${activeTab === "feed" ? "text-white font-bold" : ""}`}>Explorar</span>
        </button>

        <button onClick={() => setActiveTab("pet")} className="flex flex-1 flex-col items-center justify-center py-1 text-neutral-400 hover:text-white">
          <PawPrint className={`h-5 w-5 ${activeTab === "pet" ? "text-fire scale-110" : ""}`} />
          <span className={`text-[10px] mt-1 ${activeTab === "pet" ? "text-fire font-bold" : ""}`}>Mascotes</span>
        </button>

        <div className="flex flex-1 justify-center -mt-6">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveTab("camera")} className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-fire via-fire-glow to-neon-pink p-1 shadow-[0_0_20px_rgba(255,85,0,0.6)]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-dark-bg group-hover:bg-transparent"><Camera className="h-6 w-6 text-white group-hover:scale-110 transition-transform" /></div>
          </motion.button>
        </div>

        <button onClick={() => setActiveTab("chat")} className="relative flex flex-1 flex-col items-center justify-center py-1 text-neutral-400 hover:text-white">
          <div className="relative">
            <MessageCircle className={`h-5 w-5 ${activeTab === "chat" ? "text-white scale-110" : ""}`} />
            {unreadMessagesCount > 0 && <span className="absolute -right-1.5 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-fire px-1 text-[8px] font-black text-white">{unreadMessagesCount}</span>}
          </div>
          <span className={`text-[10px] mt-1 ${activeTab === "chat" ? "text-white font-bold" : ""}`}>Chat</span>
        </button>

        <button onClick={() => setActiveTab("clan")} className="flex flex-1 flex-col items-center justify-center py-1 text-neutral-400 hover:text-white">
          <Shield className={`h-5 w-5 ${activeTab === "clan" ? "text-amber-400 scale-110 animate-pulse" : ""}`} />
          <span className={`text-[10px] mt-1 ${activeTab === "clan" ? "text-amber-400 font-bold" : ""}`}>Clãs 🛡️</span>
        </button>
      </div>
    </nav>
  );
}
