"use client";

import React from "react";
import { useApp } from "../providers/Providers";
import { Flame, Sparkles, LogOut, Grid, ShieldCheck, Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function ProfileTab() {
  const { user, logout, instants } = useApp();

  const myInstants = instants.filter((i: any) => i.userId === user?.id || i.userName === user?.name);

  // Calendário simulado 30 dias (verde = mandou instant)
  const retentionCalendar = [true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true];

  return (
    <div className="mx-auto max-w-md pb-24 pt-4 px-3 space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-dark-card border border-white/10 p-6 shadow-2xl backdrop-blur-xl text-center space-y-4">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-fire/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto h-24 w-24 rounded-full p-1 bg-gradient-to-tr from-fire via-neon-purple to-neon-cyan shadow-[0_0_25px_rgba(255,85,0,0.4)]">
          <img src={user?.image} alt={user?.name} className="h-full w-full rounded-full object-cover bg-dark-bg" />
        </div>

        <div>
          <h2 className="text-xl font-black text-white flex items-center justify-center space-x-1.5">
            <span>{user?.name}</span>
            <ShieldCheck className="h-5 w-5 text-neon-cyan" />
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">{user?.handle}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="rounded-2xl bg-dark-elevated p-3 border border-white/5">
            <div className="flex items-center justify-center space-x-1 text-fire font-black text-base">
              <Flame className="h-4 w-4 fill-fire" />
              <span>{user?.streak}</span>
            </div>
            <p className="text-[10px] text-neutral-400 uppercase mt-0.5 font-bold">Foguinho 🔥</p>
          </div>

          <div className="rounded-2xl bg-dark-elevated p-3 border border-white/5">
            <p className="text-white font-black text-base">{user?.instantsCount}</p>
            <p className="text-[10px] text-neutral-400 uppercase mt-0.5 font-bold">Instants</p>
          </div>

          <div className="rounded-2xl bg-dark-elevated p-3 border border-white/5">
            <p className="text-neon-purple font-black text-base">Nvl 8</p>
            <p className="text-[10px] text-neutral-400 uppercase mt-0.5 font-bold">Vibe Cyber</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col space-y-2.5">
          <button onClick={logout} className="flex items-center justify-center space-x-2 w-full rounded-xl bg-red-500/10 border border-red-500/30 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all">
            <LogOut className="h-4 w-4" />
            <span>Sair do Aplicativo</span>
          </button>
        </div>
      </div>

      {/* CALENDÁRIO DE RETENÇÃO E PONTUALIDADE (30 DIAS) */}
      <div className="rounded-3xl bg-dark-card border border-white/10 p-5 space-y-3 shadow-xl text-left">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span>Calendário de Ofensiva • Junho</span>
          </h3>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
            🔥 28/30 Dias Ativos
          </span>
        </div>
        <p className="text-[11px] text-neutral-400">Pontos verdes representam dias em que você partilhou seu Instant no tempo exato!</p>

        <div className="grid grid-cols-10 gap-2 pt-1">
          {retentionCalendar.map((active, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-mono font-bold transition-transform hover:scale-125 ${
                active ? "bg-emerald-500 text-dark-bg shadow-[0_0_8px_rgba(16,185,129,0.5)] font-black" : "bg-white/5 text-neutral-600 border border-white/5"
              }`}
              title={`Dia ${idx + 1}: ${active ? "Instant Partilhado!" : "Ofensiva perdida"}`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* CONQUISTAS COMPARTILHADAS */}
      <div className="rounded-3xl bg-dark-card border border-white/10 p-5 space-y-3 shadow-xl text-left">
        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
          <Trophy className="h-4 w-4 text-amber-400" />
          <span>Conquistas de Retenção Suprema</span>
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 bg-dark-elevated p-3 rounded-2xl border border-amber-500/30">
            <span className="text-2xl">🌟💯</span>
            <div>
              <p className="text-xs font-bold text-white">Dia Perfeito em Squad</p>
              <p className="text-[10px] text-neutral-400">Todos os amigos enviaram foto no mesmo dia</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-dark-elevated p-3 rounded-2xl border border-neon-purple/30">
            <span className="text-2xl">👑</span>
            <div>
              <p className="text-xs font-bold text-white">Guardião do Tempo</p>
              <p className="text-[10px] text-neutral-400">Voltou por 28 dias seguidos ao aplicativo</p>
            </div>
          </div>
        </div>
      </div>

      {/* GALERIA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-extrabold text-white flex items-center space-x-1.5">
            <Grid className="h-4 w-4 text-neon-cyan" />
            <span>Minha Galeria de Instants ✨</span>
          </h3>
          <span className="text-xs text-neutral-400">{myInstants.length} salvos</span>
        </div>

        {myInstants.length === 0 ? (
          <div className="rounded-2xl bg-dark-card p-8 text-center border border-white/5">
            <Sparkles className="h-8 w-8 text-neutral-500 mx-auto mb-2" />
            <p className="text-xs text-neutral-400">Nenhum Instant na sua galeria ainda. Tire sua primeira foto na câmera!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {myInstants.map((inst: any) => (
              <motion.div key={inst.id} whileHover={{ scale: 1.03 }} className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-dark-card border border-white/10 shadow-lg">
                <img src={inst.mediaUrl} alt={inst.caption} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
