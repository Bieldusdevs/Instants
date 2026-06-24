"use client";

import React from "react";
import { useApp } from "../providers/Providers";
import { Shield, Sparkles, Trophy, Gift, Check, Flame, Users, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function ClanTab() {
  const { clan, claimClanMission } = useApp();

  const handleClaim = (misId: string) => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#ffd700", "#ff5500", "#8a2be2"]
    });
    claimClanMission(misId);
  };

  return (
    <div className="mx-auto max-w-md pb-28 pt-3 px-3 space-y-5 text-center">
      {/* Banner Superior do Clã */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-fire/20 via-neon-purple/30 to-dark-card border border-fire/40 p-5 shadow-2xl backdrop-blur-xl flex items-center justify-between">
        <div className="text-left space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-black text-fire-light uppercase tracking-wider">
            <Crown className="h-4 w-4 animate-bounce text-amber-400" />
            <span>Clã Permanente</span>
          </div>
          <h2 className="text-xl font-black text-white">{clan.name} <span className="text-neon-cyan text-sm">{clan.tag}</span></h2>
          <p className="text-xs text-neutral-300">Nível Supremo: <strong className="text-white">{clan.level}</strong> ({clan.xp} XP)</p>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-4xl drop-shadow-md">🐲</span>
          <span className="text-[10px] font-bold text-white mt-1">Mascote {clan.mascot.name}</span>
        </div>
      </div>

      {/* MASCOTE COMPARTILHADO DO GRUPO */}
      <div className="rounded-3xl bg-dark-card border border-white/10 p-5 space-y-3 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400">Mascote de Guilda • Quasar</h3>
          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            💖 Felicidade 100%
          </span>
        </div>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="py-4 text-7xl select-none"
        >
          🎩🐲🥽
        </motion.div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          Alimentado cooperativamente por todos os 4 guerreiros do clã. Itens cósmicos equipados!
        </p>

        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10">
          {clan.members.map((mem: any) => (
            <div key={mem.id} className="flex flex-col items-center p-1.5 rounded-xl bg-dark-elevated border border-white/5">
              <img src={mem.avatar} alt={mem.name} className="h-8 w-8 rounded-full object-cover border border-fire/40" />
              <span className="text-[9px] font-bold text-white mt-1 truncate max-w-full">{mem.name.split(" ")[0]}</span>
              <span className="text-[8px] text-neon-cyan">{mem.weeklyPoints} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* MISSÕES DIÁRIAS EM EQUIPE */}
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-white flex items-center space-x-1.5">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>Missões Diárias em Equipe 📜</span>
          </h3>
          <span className="text-xs text-neutral-400">Atualiza em 12h</span>
        </div>

        <div className="space-y-2.5">
          {clan.missions.map((mis: any) => (
            <div key={mis.id} className="rounded-2xl bg-dark-card border border-white/10 p-4 shadow-md flex items-center justify-between space-x-3">
              <div className="flex-1 space-y-1">
                <p className={`text-xs font-bold ${mis.completed ? "text-neutral-400 line-through" : "text-white"}`}>{mis.title}</p>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-fire transition-all duration-500" style={{ width: `${(mis.progress / mis.total) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">{mis.progress}/{mis.total}</span>
                </div>
              </div>

              <div>
                {!mis.completed ? (
                  <button
                    onClick={() => handleClaim(mis.id)}
                    className="rounded-xl bg-gradient-to-tr from-fire to-fire-glow px-3 py-2 text-xs font-black text-white hover:scale-105 transition-all shadow-[0_0_12px_rgba(255,85,0,0.4)] shrink-0"
                  >
                    Resgatar +{mis.rewardXp}
                  </button>
                ) : (
                  <span className="flex items-center space-x-1 text-emerald-400 text-xs font-black bg-emerald-500/10 px-2.5 py-1.5 rounded-xl border border-emerald-500/30">
                    <Check className="h-3.5 w-3.5" />
                    <span>Concluído</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
