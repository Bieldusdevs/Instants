"use client";

import React, { useState } from "react";
import { useApp } from "@/components/providers/Providers";
import { ShaderBackground } from "@/components/canvas/ShaderBackground";
import { Navbar } from "@/components/app/Navbar";
import { BottomNav } from "@/components/app/BottomNav";
import { FeedTab } from "@/components/app/FeedTab";
import { PetTab } from "@/components/app/PetTab";
import { ClanTab } from "@/components/app/ClanTab";
import { CameraTab } from "@/components/app/CameraTab";
import { ChatTab } from "@/components/app/ChatTab";
import { ProfileTab } from "@/components/app/ProfileTab";
import { Lock, Phone, PawPrint, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { user, setUser, activeTab } = useApp();
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [regName, setRegName] = useState("");
  const [regHandle, setRegHandle] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPetName, setRegPetName] = useState("");
  const [regPetType, setRegPetType] = useState<any>("dragon");

  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName, handle: regHandle || regName.toLowerCase(), phone: regPhone, password: regPassword, petName: regPetName || "Byte", petType: regPetType
        })
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Falha no cadastro."); setLoading(false); return; }
      setUser(data.user);
      localStorage.setItem("instants_u_v6", JSON.stringify(data.user));
    } catch (err) { setErrorMsg("Erro de conexão."); } finally { setLoading(false); }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier: loginId, password: loginPass })
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Acesso negado."); setLoading(false); return; }
      setUser(data.user);
      localStorage.setItem("instants_u_v6", JSON.stringify(data.user));
    } catch (err) { setErrorMsg("Falha ao contactar o servidor."); } finally { setLoading(false); }
  };

  const allPetOptions = [
    { id: "dragon", icon: "🐉", name: "Dragão" },
    { id: "tiger", icon: "🐯", name: "Tigre" },
    { id: "wolf", icon: "🐺", name: "Lobo" },
    { id: "panther", icon: "🐆", name: "Pantera" },
    { id: "cat", icon: "🐱", name: "Gato" },
    { id: "fox", icon: "🦊", name: "Raposa" },
    { id: "owl", icon: "🦉", name: "Coruja" },
    { id: "panda", icon: "🐼", name: "Panda" }
  ];

  if (!user) {
    return (
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-x-hidden">
        <ShaderBackground />
        <div className="relative z-10 w-full max-w-md mx-auto space-y-6 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 backdrop-blur-xl shadow-lg">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-black tracking-wide uppercase text-emerald-300">Escala Milhares de Pessoas • Gráficos GTA 5</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-1">
            <h1 className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_35px_rgba(255,85,0,0.3)]">Instants<span className="text-fire">.</span></h1>
            <p className="text-xs text-neutral-300">A rede social definitiva de mistérios BeReal & Mascotes 3D <span className="text-fire font-bold">🪐🐾</span>.</p>
          </motion.div>

          <div className="flex rounded-2xl bg-dark-card/90 p-1 border border-white/10 max-w-xs mx-auto">
            <button onClick={() => { setAuthMode("register"); setErrorMsg(""); }} className={`flex-1 py-2 rounded-xl text-xs font-black ${authMode === "register" ? "bg-fire text-white shadow-lg" : "text-neutral-400"}`}>Criar Conta 🔒</button>
            <button onClick={() => { setAuthMode("login"); setErrorMsg(""); }} className={`flex-1 py-2 rounded-xl text-xs font-black ${authMode === "login" ? "bg-fire text-white shadow-lg" : "text-neutral-400"}`}>Login 🚀</button>
          </div>

          <motion.div key={authMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-dark-card/95 border border-white/15 p-6 shadow-2xl text-left">
            {errorMsg && <div className="rounded-xl bg-red-500/20 border border-red-500 p-3 text-xs font-bold text-red-300 mb-4 text-center">{errorMsg}</div>}

            {authMode === "register" ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="text-center pb-1"><h3 className="text-base font-extrabold text-white">Cadastro Profissional</h3></div>
                <div><label className="text-[10px] font-bold text-neutral-400 block mb-1">Nome</label><input type="text" required placeholder="Ex: Alex Cyber" value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-2.5 text-xs text-white" /></div>
                <div><label className="text-[10px] font-bold text-neutral-400 block mb-1">Apelido (@handle)</label><input type="text" required placeholder="Ex: alex.instants" value={regHandle} onChange={(e) => setRegHandle(e.target.value)} className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-2.5 text-xs text-white" /></div>
                <div><label className="text-[10px] font-bold text-fire-light block mb-1 flex items-center space-x-1"><Phone className="h-3 w-3" /><span>Número de Telefone (Obrigatório) *</span></label><input type="tel" required placeholder="+55 11 99999-9999 ou +351 912 345 678" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="w-full rounded-xl bg-dark-elevated border border-fire/50 px-3 py-2.5 text-xs text-white font-mono" /></div>
                <div><label className="text-[10px] font-bold text-neutral-400 block mb-1">Senha Rápida</label><input type="password" required minLength={6} placeholder="••••••••" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-2.5 text-xs text-white" /></div>

                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <label className="text-[10px] font-bold text-neon-cyan block">Mascote 3D PBR Realista 🐾</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {allPetOptions.map((p) => (
                      <button type="button" key={p.id} onClick={() => setRegPetType(p.id)} className={`p-2 rounded-xl border flex flex-col items-center transition-all ${regPetType === p.id ? "bg-fire/20 border-fire scale-105" : "bg-dark-elevated border-white/10 opacity-60"}`}>
                        <span className="text-lg">{p.icon}</span>
                        <span className="text-[8px] font-bold text-white mt-0.5">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button disabled={loading} type="submit" className="w-full rounded-2xl bg-gradient-to-r from-fire via-fire-glow to-neon-purple py-3.5 text-xs font-black text-white shadow-lg mt-4">
                  {loading ? "Validando Segurança..." : "Cadastrar & Nascer Pet 🔒"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="text-center pb-1"><h3 className="text-base font-extrabold text-white">Acesso Seguro</h3></div>
                <div><label className="text-[10px] font-bold text-neutral-400 block mb-1">Seu Handle ou Telefone</label><input type="text" required placeholder="Ex: @alex.instants ou +5511999999999" value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-3 text-xs text-white" /></div>
                <div><label className="text-[10px] font-bold text-neutral-400 block mb-1">Senha</label><input type="password" required placeholder="••••••••" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-3 text-xs text-white" /></div>
                <button disabled={loading} type="submit" className="w-full rounded-2xl bg-gradient-to-r from-fire via-fire-glow to-neon-purple py-3.5 text-xs font-black text-white shadow-lg mt-4">
                  {loading ? "Verificando Rate Limit..." : "Entrar com SHA-256 🚀"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-dark-bg text-white selection:bg-fire">
      <ShaderBackground />
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "feed" && <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FeedTab /></motion.div>}
          {activeTab === "pet" && <motion.div key="pet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><PetTab /></motion.div>}
          {activeTab === "clan" && <motion.div key="clan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ClanTab /></motion.div>}
          {activeTab === "camera" && <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><CameraTab /></motion.div>}
          {activeTab === "chat" && <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ChatTab /></motion.div>}
          {activeTab === "profile" && <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProfileTab /></motion.div>}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}
