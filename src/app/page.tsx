"use client";

import React, { useState } from "react";
import { useApp } from "@/components/providers/Providers";
import { ShaderBackground } from "@/components/canvas/ShaderBackground";
import { Navbar } from "@/components/app/Navbar";
import { BottomNav } from "@/components/app/BottomNav";
import { FeedTab } from "@/components/app/FeedTab";
import { CameraTab } from "@/components/app/CameraTab";
import { ChatTab } from "@/components/app/ChatTab";
import { ProfileTab } from "@/components/app/ProfileTab";
import { Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { user, activeTab, loginAsDemo } = useApp();
  const [customDemoName, setCustomDemoName] = useState("Alex Cyber");

  // SE NÃO LOGADO: Exibe Tela de Autenticação / Boas-Vindas PWA
  if (!user) {
    return (
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        {/* Fundo GLSL Shader 3D (React Three Fiber + Three.js) */}
        <ShaderBackground />

        <div className="relative z-10 w-full max-w-md mx-auto space-y-8 text-center">
          {/* Badge Superior */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 backdrop-blur-xl shadow-lg"
          >
            <Sparkles className="h-4 w-4 text-fire-light animate-spin" style={{ animationDuration: "8s" }} />
            <span className="text-xs font-black tracking-wide uppercase text-neutral-200">
              PWA Moderno • WebGPU Ready
            </span>
          </motion.div>

          {/* Título Hero */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
            <h1 className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_35px_rgba(255,85,0,0.3)]">
              Instants<span className="text-fire">.</span>
            </h1>
            <p className="text-sm text-neutral-300 max-w-xs mx-auto leading-relaxed">
              Partilhe fotos aleatórias, responda nos stories e fale pelo chat mantendo a sua ofensiva diária <span className="text-fire font-bold">🔥</span>.
            </p>
          </motion.div>

          {/* Card de Acesso */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-dark-card/90 border border-white/15 p-6 shadow-2xl backdrop-blur-2xl space-y-5 text-left"
          >
            <div className="space-y-1 text-center pb-1">
              <h3 className="text-base font-bold text-white">Bem-vindo ao Instants!</h3>
              <p className="text-xs text-neutral-400">Digite seu nome ou apelido para entrar</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider ml-1 block mb-1">
                  Seu Nome / Apelido
                </label>
                <input
                  type="text"
                  placeholder="Ex: Alex Cyber"
                  value={customDemoName}
                  onChange={(e) => setCustomDemoName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && loginAsDemo(customDemoName || "Alex Cyber")}
                  className="w-full rounded-2xl bg-dark-elevated border border-white/15 px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden transition-colors"
                  autoFocus
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => loginAsDemo(customDemoName || "Alex Cyber")}
                className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-fire via-fire-glow to-neon-purple py-4 text-sm font-black text-white shadow-[0_0_25px_rgba(255,85,0,0.5)] transition-all"
              >
                <Zap className="h-5 w-5 fill-white animate-bounce" />
                <span>Entrar no App Agora ✨🔥</span>
              </motion.button>
            </div>
            
            <p className="text-[11px] text-neutral-500 text-center leading-normal">
              ⚡️ Funcionamento instantâneo offline e PWA nativo no celular. Seus instants são salvos localmente.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  // SE LOGADO: Renderiza App PWA Completo
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-dark-bg text-white selection:bg-fire">
      <ShaderBackground />
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "feed" && (
            <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FeedTab />
            </motion.div>
          )}
          {activeTab === "camera" && (
            <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CameraTab />
            </motion.div>
          )}
          {activeTab === "chat" && (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ChatTab />
            </motion.div>
          )}
          {activeTab === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProfileTab />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}
