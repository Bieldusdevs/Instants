"use client";

import React from "react";
import { useApp } from "../providers/Providers";
import { Compass, Camera, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const { activeTab, setActiveTab, chats } = useApp();

  const unreadMessagesCount = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-dark-bg/90 pb-safe backdrop-blur-2xl">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {/* Tab: Feed */}
        <button
          onClick={() => setActiveTab("feed")}
          className="relative flex flex-1 flex-col items-center justify-center py-1.5 transition-colors text-neutral-400 hover:text-white"
        >
          <Compass
            className={`h-6 w-6 transition-transform ${activeTab === "feed" ? "text-white scale-110" : ""}`}
          />
          <span className={`text-[10px] mt-1 font-medium ${activeTab === "feed" ? "text-white font-bold" : ""}`}>
            Explorar
          </span>
          {activeTab === "feed" && (
            <motion.div
              layoutId="bottom-indicator"
              className="absolute bottom-0 h-1 w-8 rounded-full bg-fire shadow-[0_0_8px_#ff5500]"
            />
          )}
        </button>

        {/* Tab Central: Câmera (Botão Luminoso Moderno) */}
        <div className="flex flex-1 justify-center -mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab("camera")}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-fire via-fire-glow to-neon-pink p-1 shadow-[0_0_20px_rgba(255,85,0,0.6)] transition-all"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-dark-bg transition-colors group-hover:bg-transparent">
              <Camera className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
            </div>
          </motion.button>
        </div>

        {/* Tab: Chat */}
        <button
          onClick={() => setActiveTab("chat")}
          className="relative flex flex-1 flex-col items-center justify-center py-1.5 transition-colors text-neutral-400 hover:text-white"
        >
          <div className="relative">
            <MessageCircle
              className={`h-6 w-6 transition-transform ${activeTab === "chat" ? "text-white scale-110" : ""}`}
            />
            {unreadMessagesCount > 0 && (
              <span className="absolute -right-1.5 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-fire px-1 text-[9px] font-black text-white shadow-sm">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-1 font-medium ${activeTab === "chat" ? "text-white font-bold" : ""}`}>
            Chat
          </span>
          {activeTab === "chat" && (
            <motion.div
              layoutId="bottom-indicator"
              className="absolute bottom-0 h-1 w-8 rounded-full bg-fire shadow-[0_0_8px_#ff5500]"
            />
          )}
        </button>

        {/* Tab: Perfil */}
        <button
          onClick={() => setActiveTab("profile")}
          className="relative flex flex-1 flex-col items-center justify-center py-1.5 transition-colors text-neutral-400 hover:text-white"
        >
          <User
            className={`h-6 w-6 transition-transform ${activeTab === "profile" ? "text-white scale-110" : ""}`}
          />
          <span className={`text-[10px] mt-1 font-medium ${activeTab === "profile" ? "text-white font-bold" : ""}`}>
            Perfil
          </span>
          {activeTab === "profile" && (
            <motion.div
              layoutId="bottom-indicator"
              className="absolute bottom-0 h-1 w-8 rounded-full bg-fire shadow-[0_0_8px_#ff5500]"
            />
          )}
        </button>
      </div>
    </nav>
  );
}
