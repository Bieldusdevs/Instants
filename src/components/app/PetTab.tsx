"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Sparkles, Utensils, Heart, ShowerHead, Moon, Shirt, Users, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function PetTab() {
  const { pet, feedPet, playPet, cleanPet, sleepPet, updatePetStyle, chats, sendPetInvite } = useApp();
  const [activeMenu, setActiveMenu] = useState<"care" | "style" | "coop">("care");
  const [selectedFriendInvite, setSelectedFriendInvite] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState(false);

  const petEmojis: Record<string, string> = {
    cat: "🐱",
    dog: "🐶",
    dragon: "🐉",
    fox: "🦊",
  };

  const hatEmojis: Record<string, string> = {
    none: "",
    crown: "👑",
    wizard: "🎩",
    cap: "🧢",
  };

  const glassesEmojis: Record<string, string> = {
    none: "",
    cyber: "🕶️",
    thug: "👓",
    pixel: "🥽",
  };

  const handleActionConfetti = (emoji: string) => {
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.5 },
      colors: ["#ff5500", "#00f0ff", "#ff007f"],
    });
  };

  const handleInviteCoop = (friendId: string) => {
    sendPetInvite(friendId, pet.name, pet.type);
    setSelectedFriendInvite(friendId);
    setInviteSent(true);
    setTimeout(() => setInviteSent(false), 3000);
  };

  return (
    <div className="mx-auto max-w-md pb-28 pt-3 px-3 space-y-5 text-center">
      {/* Top Banner Co-op Status */}
      <div className="rounded-2xl bg-dark-card border border-white/10 p-3 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {pet.owners.map((owner: any, idx: number) => (
              <img key={idx} src={owner.avatar} alt={owner.name} className="h-8 w-8 rounded-full border-2 border-dark-card object-cover" />
            ))}
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white">{pet.name}</h4>
            <p className="text-[10px] text-neon-cyan font-medium">
              {pet.owners.length > 1 ? `🐾 Dupla Co-op (${pet.owners.map((o: any) => o.name.split(" ")[0]).join(" & ")})` : "🐾 Pet Individual"}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-fire/20 border border-fire/40 px-2.5 py-1 text-xs font-black text-fire-light">
          Nvl {pet.level}
        </span>
      </div>

      {/* TELA CENTRAL DO PET (Tamagotchi Visual) */}
      <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-dark-elevated via-dark-card to-dark-bg border border-white/15 p-6 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#ff5500_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        {/* Efeito de Aura */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute h-56 w-56 rounded-full bg-gradient-to-tr from-fire via-neon-purple to-neon-cyan blur-3xl pointer-events-none"
        />

        {/* Pet Flutuante Interativo */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          className="relative cursor-pointer select-none py-8 flex flex-col items-center"
        >
          {/* Chapéu */}
          {pet.hat !== "none" && (
            <span className="absolute -top-6 text-5xl drop-shadow-md animate-bounce">{hatEmojis[pet.hat]}</span>
          )}

          {/* Rosto / Animal */}
          <span className="text-8xl drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform">{petEmojis[pet.type]}</span>

          {/* Óculos */}
          {pet.glasses !== "none" && (
            <span className="absolute top-10 text-4xl drop-shadow-lg">{glassesEmojis[pet.glasses]}</span>
          )}

          {/* Colar / Acessório */}
          {pet.accessory === "chain" && (
            <span className="absolute bottom-6 text-3xl">📿</span>
          )}
        </motion.div>

        {/* Status Flutuantes */}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-1.5 bg-black/60 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10">
          <div>
            <p className="text-[9px] uppercase font-bold text-neutral-400">Fome</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${pet.hunger}%` }} />
            </div>
          </div>
          <div>
            <p className="text-[9px] uppercase font-bold text-neutral-400">Amor</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-neon-pink transition-all duration-500" style={{ width: `${pet.happiness}%` }} />
            </div>
          </div>
          <div>
            <p className="text-[9px] uppercase font-bold text-neutral-400">Higiene</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-neon-cyan transition-all duration-500" style={{ width: `${pet.hygiene}%` }} />
            </div>
          </div>
          <div>
            <p className="text-[9px] uppercase font-bold text-neutral-400">Energia</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${pet.energy}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Selector de Abas do Pet */}
      <div className="flex justify-center space-x-2 bg-dark-card p-1 rounded-2xl border border-white/10">
        {[
          { id: "care", label: "Cuidar 🍗", icon: Utensils },
          { id: "style", label: "Guarda-Roupa 🎩", icon: Shirt },
          { id: "coop", label: "Convidar Dupla 💌", icon: Users },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMenu(m.id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 py-2 rounded-xl text-xs font-black transition-all ${
              activeMenu === m.id ? "bg-fire text-white shadow-md" : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* ABA 1: CUIDAR (Ações Rápidas) */}
      <AnimatePresence mode="wait">
        {activeMenu === "care" && (
          <motion.div key="care" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { feedPet(); handleActionConfetti("🍎"); }}
              className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-amber-500/30 p-3.5 hover:bg-amber-500/10 transition-all active:scale-95"
            >
              <div className="rounded-xl bg-amber-500/20 p-2 text-xl">🍎</div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Dar Comida</p>
                <p className="text-[10px] text-neutral-400">+25 Fome • +15 XP</p>
              </div>
            </button>

            <button
              onClick={() => { playPet(); handleActionConfetti("🎾"); }}
              className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-neon-pink/30 p-3.5 hover:bg-neon-pink/10 transition-all active:scale-95"
            >
              <div className="rounded-xl bg-neon-pink/20 p-2 text-xl">🎾</div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Brincar / Passear</p>
                <p className="text-[10px] text-neutral-400">+25 Amor • +20 XP</p>
              </div>
            </button>

            <button
              onClick={() => { cleanPet(); handleActionConfetti("🧼"); }}
              className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-neon-cyan/30 p-3.5 hover:bg-neon-cyan/10 transition-all active:scale-95"
            >
              <div className="rounded-xl bg-neon-cyan/20 p-2 text-xl">🧼</div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Dar Banho</p>
                <p className="text-[10px] text-neutral-400">+30 Higiene</p>
              </div>
            </button>

            <button
              onClick={() => { sleepPet(); handleActionConfetti("💤"); }}
              className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-emerald-500/30 p-3.5 hover:bg-emerald-500/10 transition-all active:scale-95"
            >
              <div className="rounded-xl bg-emerald-500/20 p-2 text-xl">💤</div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Colocar Dormir</p>
                <p className="text-[10px] text-neutral-400">100% Energia</p>
              </div>
            </button>
          </motion.div>
        )}

        {/* ABA 2: GUARDA-ROUPA */}
        {activeMenu === "style" && (
          <motion.div key="style" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 bg-dark-card p-4 rounded-2xl border border-white/10 text-left">
            <div>
              <p className="text-xs font-extrabold text-white mb-2">Chapéus & Coroas</p>
              <div className="flex space-x-2">
                {[
                  { id: "none", label: "Nenhum" },
                  { id: "crown", label: "Coroa 👑" },
                  { id: "wizard", label: "Mago 🎩" },
                  { id: "cap", label: "Boné 🧢" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updatePetStyle("hat", item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      pet.hat === item.id ? "bg-fire text-white shadow-[0_0_10px_#ff5500]" : "bg-dark-elevated text-neutral-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold text-white mb-2">Óculos Cyber</p>
              <div className="flex space-x-2">
                {[
                  { id: "none", label: "Nenhum" },
                  { id: "cyber", label: "Neon 🕶️" },
                  { id: "thug", label: "Pixel 👓" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updatePetStyle("glasses", item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      pet.glasses === item.id ? "bg-fire text-white shadow-[0_0_10px_#ff5500]" : "bg-dark-elevated text-neutral-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ABA 3: CO-OP COM AMIGOS */}
        {activeMenu === "coop" && (
          <motion.div key="coop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 bg-dark-card p-4 rounded-2xl border border-white/10 text-left">
            <h4 className="text-xs font-black text-white flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-fire" />
              <span>Convidar um Amigo para Cuidar Juntos 🐾</span>
            </h4>
            <p className="text-[11px] text-neutral-400">
              Escolha um amigo do chat. Vocês dois receberão o status desse animalzinho e terão que alimentá-lo diariamente para não perder a ofensiva de amizade!
            </p>

            <div className="space-y-2 pt-2">
              {chats.map((chat: any) => (
                <div key={chat.id} className="flex items-center justify-between rounded-xl bg-dark-elevated p-3 border border-white/5">
                  <div className="flex items-center space-x-2.5">
                    <img src={chat.avatar} alt={chat.name} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-white">{chat.name}</p>
                      <p className="text-[10px] text-neutral-400">{chat.handle}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInviteCoop(chat.id)}
                    disabled={selectedFriendInvite === chat.id && inviteSent}
                    className="flex items-center space-x-1 rounded-xl bg-fire px-3 py-1.5 text-xs font-black text-white hover:bg-fire-glow transition-all shadow-sm"
                  >
                    {selectedFriendInvite === chat.id && inviteSent ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Enviado!</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Convidar</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
