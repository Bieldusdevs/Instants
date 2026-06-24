"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Heart, Camera, Flame, MapPin, Sparkles, Film, Map, EyeOff, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FeedTab() {
  const { instants, likeInstant, replyWithPhotoOnly, setActiveTab, user } = useApp();
  const [showRadarMap, setShowRadarMap] = useState(false);

  const handleReplyPhoto = (instantId: string) => {
    // Redireciona para tirar foto de reação instantânea!
    setActiveTab("camera");
  };

  return (
    <div className="mx-auto max-w-md pb-24 pt-3 px-3 space-y-5">
      {/* ÁLBUM AUTOMÁTICO DO MÊS */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-r from-neon-purple/20 via-blue-600/20 to-dark-card border border-neon-purple/40 p-4 shadow-xl backdrop-blur-xl flex items-center justify-between"
      >
        <div className="space-y-1 text-left">
          <div className="flex items-center space-x-1 text-neon-cyan text-[10px] font-black uppercase">
            <Film className="h-3.5 w-3.5 animate-pulse" />
            <span>Memórias Automáticas</span>
          </div>
          <h3 className="text-sm font-bold text-white">Seu Álbum de Junho/2026 🎞️✨</h3>
          <p className="text-[11px] text-neutral-300">Compilado com 142 Instants e trilha sonora épica.</p>
        </div>
        <button
          onClick={() => alert("🎞️✨ Abrindo player em tela cheia com as suas melhores memórias automáticas!")}
          className="rounded-xl bg-neon-purple px-3 py-2 text-xs font-black text-white hover:scale-105 transition-all shadow-[0_0_12px_#8a2be2] shrink-0 ml-2"
        >
          Ver Vídeo 🎬
        </button>
      </motion.div>

      {/* TOGGLE MAPA PRIVADO DE INSTANTS */}
      <div className="rounded-2xl bg-dark-card border border-white/10 p-3.5 space-y-2 text-left shadow-md">
        <button
          onClick={() => setShowRadarMap(!showRadarMap)}
          className="flex items-center justify-between w-full text-xs font-bold text-neutral-200 hover:text-white transition-colors"
        >
          <div className="flex items-center space-x-2 text-neon-cyan">
            <Map className="h-4 w-4" />
            <span>Mapa Privado de Instants dos Amigos 📍</span>
          </div>
          <span className="text-[10px] text-neutral-400">{showRadarMap ? "Ocultar Radar" : "Mostrar Radar"}</span>
        </button>

        <AnimatePresence>
          {showRadarMap && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-2 border-t border-white/10 space-y-3 overflow-hidden">
              <div className="relative aspect-video w-full rounded-xl bg-black/80 border border-neon-cyan/40 p-3 flex items-center justify-center overflow-hidden">
                {/* Radar grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                <div className="absolute h-full w-full rounded-full border border-neon-cyan/30 animate-ping" />
                
                {/* Pontos dos amigos */}
                <div className="absolute top-1/4 left-1/3 flex items-center space-x-1 bg-dark-card/90 px-2 py-0.5 rounded-full border border-fire text-[9px] font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-fire animate-pulse" />
                  <span>Sofia (Tóquio)</span>
                </div>
                <div className="absolute bottom-1/3 right-1/4 flex items-center space-x-1 bg-dark-card/90 px-2 py-0.5 rounded-full border border-neon-purple text-[9px] font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-neon-purple animate-pulse" />
                  <span>Lucas (Lisboa)</span>
                </div>
                <div className="absolute top-1/2 right-1/3 flex items-center space-x-1 bg-dark-card/90 px-2 py-0.5 rounded-full border border-emerald-400 text-[9px] font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Você (Sua Casa)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 px-1">
                <span className="flex items-center space-x-1"><ShieldCheck className="h-3 w-3 text-emerald-400" /><span>Visível apenas para besties</span></span>
                <span className="text-neon-pink cursor-pointer underline">Modo Fantasma 👁️</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LISTA DE INSTANTS */}
      <div className="space-y-5">
        {instants.map((instant: any, index: number) => (
          <motion.article
            key={instant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-3xl bg-dark-card/80 border border-white/10 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center space-x-3">
                <img src={instant.userImage} alt={instant.userName} className="h-10 w-10 rounded-full border border-fire/40 object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{instant.userName}</h4>
                  <p className="text-[11px] text-neutral-400">{instant.userHandle}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {instant.location && (
                  <span className="flex items-center space-x-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-neutral-300">
                    <MapPin className="h-3 w-3 text-neon-cyan" />
                    <span>{instant.location}</span>
                  </span>
                )}
                <span className="flex items-center space-x-1 rounded-full bg-fire/15 border border-fire/30 px-2.5 py-0.5 text-[11px] font-extrabold text-fire-light">
                  <Flame className="h-3 w-3 fill-fire text-fire" />
                  <span>{instant.streakDays}d</span>
                </span>
              </div>
            </div>

            <div className="relative aspect-4/5 w-full bg-black/40 overflow-hidden group">
              {instant.mediaType === "video" ? (
                <video src={instant.mediaUrl} controls loop muted playsInline className="h-full w-full object-cover" />
              ) : (
                <img src={instant.mediaUrl} alt={instant.caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102" loading="lazy" />
              )}
              <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                {instant.createdAt}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button whileTap={{ scale: 0.8 }} onClick={() => likeInstant(instant.id)} className="flex items-center space-x-1.5">
                    <Heart className={`h-6 w-6 ${instant.hasLiked ? "fill-fire text-fire animate-bounce" : "text-neutral-300 hover:text-white"}`} />
                    <span className="text-xs font-bold text-neutral-300">{instant.likes}</span>
                  </motion.button>
                  <span className="text-xs text-neutral-400 font-medium">{instant.repliesCount} reações</span>
                </div>

                {/* RESPOSTA APENAS COM FOTO (BeReal style) */}
                <button
                  onClick={() => handleReplyPhoto(instant.id)}
                  className="flex items-center space-x-1.5 rounded-2xl bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20 transition-all active:scale-95 shadow-sm"
                  title="Responder apenas com foto instantânea"
                >
                  <Camera className="h-4 w-4 text-neon-cyan" />
                  <span>Responder (Foto 📸)</span>
                </button>
              </div>

              <p className="text-xs text-neutral-200 leading-relaxed text-left">
                <span className="font-extrabold mr-1.5 text-white">{instant.userName}:</span>
                {instant.caption}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
