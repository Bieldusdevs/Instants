"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Heart, MessageCircle, Send, Flame, MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FeedTab() {
  const { instants, likeInstant, replyToInstant, setActiveTab, user } = useApp();
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = (instantId: string) => {
    if (!replyText.trim()) return;
    replyToInstant(instantId, replyText);
    setReplyText("");
    setReplyingToId(null);
  };

  return (
    <div className="mx-auto max-w-md pb-24 pt-4 px-3 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-fire/20 via-neon-purple/20 to-dark-card border border-fire/30 p-4 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1 pr-2">
            <div className="flex items-center space-x-1.5 text-xs font-black text-fire-light uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Instants Diários</span>
            </div>
            <h3 className="text-base font-bold text-white">Partilhe o seu momento aleatório!</h3>
            <p className="text-xs text-neutral-300">
              Mantenha o seu foguinho 🔥 aceso partilhando uma foto ou vídeo agora.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("camera")}
            className="shrink-0 rounded-xl bg-gradient-to-tr from-fire to-fire-glow px-4 py-2.5 text-xs font-black text-white shadow-[0_0_15px_rgba(255,85,0,0.5)]"
          >
            Capturar ⚡️
          </motion.button>
        </div>
      </motion.div>

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
                <img
                  src={instant.userImage}
                  alt={instant.userName}
                  className="h-10 w-10 rounded-full border border-fire/40 object-cover"
                />
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
                <video
                  src={instant.mediaUrl}
                  controls
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={instant.mediaUrl}
                  alt={instant.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                  loading="lazy"
                />
              )}

              <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                {instant.createdAt}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => likeInstant(instant.id)}
                    className="flex items-center space-x-1.5 transition-colors"
                  >
                    <Heart
                      className={`h-6 w-6 ${instant.hasLiked ? "fill-fire text-fire animate-bounce" : "text-neutral-300 hover:text-white"}`}
                    />
                    <span className="text-xs font-bold text-neutral-300">{instant.likes}</span>
                  </motion.button>

                  <button
                    onClick={() => setReplyingToId(replyingToId === instant.id ? null : instant.id)}
                    className="flex items-center space-x-1.5 text-neutral-300 hover:text-white transition-colors"
                  >
                    <MessageCircle className="h-6 w-6 text-neon-cyan" />
                    <span className="text-xs font-bold">{instant.repliesCount} respostas</span>
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  {["🔥", "⚡️", "💜"].map((emj: string) => (
                    <button
                      key={emj}
                      onClick={() => {
                        replyToInstant(instant.id, emj);
                      }}
                      className="rounded-full bg-white/5 p-1 text-sm hover:bg-white/15 transition-all hover:scale-125"
                    >
                      {emj}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-neutral-200 leading-relaxed">
                <span className="font-extrabold mr-1.5 text-white">{instant.userName}:</span>
                {instant.caption}
              </p>

              <AnimatePresence>
                {replyingToId === instant.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 border-t border-white/10 flex items-center space-x-2"
                  >
                    <input
                      type="text"
                      placeholder={`Responder a ${instant.userName}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendReply(instant.id)}
                      className="flex-1 rounded-xl bg-dark-elevated border border-white/15 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSendReply(instant.id)}
                      className="rounded-xl bg-fire p-2 text-white shadow-[0_0_10px_#ff5500] hover:bg-fire-glow transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
