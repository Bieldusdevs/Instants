"use client";

import React, { useState } from "react";
import { useApp } from "@/components/providers/Providers";
import { ShaderBackground } from "@/components/canvas/ShaderBackground";
import { Navbar } from "@/components/app/Navbar";
import { BottomNav } from "@/components/app/BottomNav";
import { FeedTab } from "@/components/app/FeedTab";
import { PetTab } from "@/components/app/PetTab";
import { CameraTab } from "@/components/app/CameraTab";
import { ChatTab } from "@/components/app/ChatTab";
import { ProfileTab } from "@/components/app/ProfileTab";
import { Sparkles, Zap, ShieldCheck, PawPrint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { user, activeTab, registerAccount, loginAccount } = useApp();
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  // Form de Cadastro
  const [regName, setRegName] = useState("");
  const [regHandle, setRegHandle] = useState("");
  const [regPetName, setRegPetName] = useState("");
  const [regPetType, setRegPetType] = useState<"dragon" | "cat" | "dog" | "fox">("dragon");

  // Form de Login
  const [loginHandle, setLoginHandle] = useState("");

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;
    registerAccount(regName, regHandle || regName.toLowerCase(), regPetName || "Byte", regPetType);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAccount(loginHandle || "alex.instants");
  };

  // SE NÃO LOGADO: Exibe Central de Cadastro e Login PWA
  if (!user) {
    return (
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-x-hidden">
        <ShaderBackground />

        <div className="relative z-10 w-full max-w-md mx-auto space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 backdrop-blur-xl shadow-lg"
          >
            <Sparkles className="h-4 w-4 text-fire-light animate-spin" style={{ animationDuration: "8s" }} />
            <span className="text-xs font-black tracking-wide uppercase text-neutral-200">
              Rede Social PWA • Tamagotchi Co-op
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-2">
            <h1 className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_35px_rgba(255,85,0,0.3)]">
              Instants<span className="text-fire">.</span>
            </h1>
            <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
              Partilhe fotos aleatórias, jogue no chat e cuide do seu bichinho virtual em dupla <span className="text-fire font-bold">🔥🐾</span>.
            </p>
          </motion.div>

          {/* Abas Login vs Cadastro */}
          <div className="flex rounded-2xl bg-dark-card/90 p-1 border border-white/10 max-w-xs mx-auto">
            <button
              onClick={() => setAuthMode("register")}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                authMode === "register" ? "bg-fire text-white shadow-lg" : "text-neutral-400"
              }`}
            >
              Criar Conta ✨
            </button>
            <button
              onClick={() => setAuthMode("login")}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                authMode === "login" ? "bg-fire text-white shadow-lg" : "text-neutral-400"
              }`}
            >
              Fazer Login 🚀
            </button>
          </div>

          <motion.div
            key={authMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-dark-card/95 border border-white/15 p-6 shadow-2xl backdrop-blur-2xl text-left"
          >
            {authMode === "register" ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="text-center pb-1">
                  <h3 className="text-base font-extrabold text-white">Monte seu Perfil & Pet</h3>
                  <p className="text-[11px] text-neutral-400">Rápido, sem e-mail ou confirmação</p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Seu Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Alex Cyber"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Apelido (@handle)</label>
                  <input
                    type="text"
                    placeholder="Ex: alex.instants"
                    value={regHandle}
                    onChange={(e) => setRegHandle(e.target.value)}
                    className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden"
                  />
                </div>

                <div className="pt-2 border-t border-white/10 space-y-2">
                  <label className="text-[10px] font-bold text-fire-light uppercase tracking-wider block">Escolha seu Bichinho Virtual 🐾</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "dragon", icon: "🐉", name: "Dragão" },
                      { id: "cat", icon: "🐱", name: "Gato" },
                      { id: "dog", icon: "🐶", name: "Cão" },
                      { id: "fox", icon: "🦊", name: "Raposa" },
                    ].map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setRegPetType(p.id as any)}
                        className={`p-2 rounded-xl border flex flex-col items-center transition-all ${
                          regPetType === p.id ? "bg-fire/20 border-fire scale-105" : "bg-dark-elevated border-white/10 opacity-60"
                        }`}
                      >
                        <span className="text-2xl">{p.icon}</span>
                        <span className="text-[9px] font-bold text-white mt-1">{p.name}</span>
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Nome do seu pet (Ex: Byte)"
                    value={regPetName}
                    onChange={(e) => setRegPetName(e.target.value)}
                    className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden mt-2"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-fire via-fire-glow to-neon-purple py-3.5 text-xs font-black text-white shadow-[0_0_20px_rgba(255,85,0,0.5)] mt-4"
                >
                  <PawPrint className="h-4 w-4 fill-white animate-bounce" />
                  <span>Cadastrar & Nascer Pet ✨</span>
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="text-center pb-1">
                  <h3 className="text-base font-extrabold text-white">Entrar de Volta</h3>
                  <p className="text-[11px] text-neutral-400">Acesse sua conta e cuide do pet</p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Seu @handle ou Apelido</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: @alex.instants"
                    value={loginHandle}
                    onChange={(e) => setLoginHandle(e.target.value)}
                    className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-3 text-xs text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Senha Rápida</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-3 text-xs text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-fire via-fire-glow to-neon-purple py-3.5 text-xs font-black text-white shadow-[0_0_20px_rgba(255,85,0,0.5)] mt-4"
                >
                  <Zap className="h-4 w-4 fill-white animate-bounce" />
                  <span>Entrar no App Agora 🚀</span>
                </motion.button>
              </form>
            )}
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
          {activeTab === "pet" && (
            <motion.div key="pet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PetTab />
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
