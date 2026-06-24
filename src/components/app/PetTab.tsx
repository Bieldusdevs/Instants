"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Sparkles, Utensils, Shirt, Users, Dna, Rocket, Star, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function PetTab() {
  const { pet, feedPet, playPet, cleanPet, sleepPet, updatePetStyle, chats, sendPetInvite, breedPets } = useApp();
  const [activeMenu, setActiveMenu] = useState<"care" | "style" | "coop" | "breed">("care");
  const [selectedFriendInvite, setSelectedFriendInvite] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState(false);
  const [hybridName, setHybridName] = useState("");

  const petEmojis: Record<string, string> = {
    cat: "🐱",
    dog: "🐶",
    dragon: "🐉",
    fox: "🦊",
    chimera: "🦄",
    alien: "👽",
    phoenix: "🔥🦅"
  };

  const hatEmojis: Record<string, string> = { none: "", crown: "👑", wizard: "🎩", cap: "🧢" };
  const glassesEmojis: Record<string, string> = { none: "", cyber: "🕶️", thug: "👓", pixel: "🥽" };

  const handleActionConfetti = () => {
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.5 }, colors: ["#ff5500", "#00f0ff", "#ff007f"] });
  };

  const handleBreed = (targetType: any) => {
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.4 }, colors: ["#8a2be2", "#00f0ff", "#ffd700"] });
    breedPets(targetType, hybridName || "Quimera Cósmica");
    setHybridName("");
  };

  return (
    <div className="mx-auto max-w-md pb-28 pt-3 px-3 space-y-5 text-center">
      {/* Top Banner Status */}
      <div className="rounded-2xl bg-dark-card border border-white/10 p-3 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {pet.owners.map((owner: any, idx: number) => (
              <img key={idx} src={owner.avatar} alt={owner.name} className="h-8 w-8 rounded-full border-2 border-dark-card object-cover" />
            ))}
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white flex items-center space-x-1">
              <span>{pet.name}</span>
              {pet.rarity === "cosmic" && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
            </h4>
            <p className="text-[10px] text-neon-cyan font-medium">
              {pet.rarity === "cosmic" ? "🪐 Mascote Cósmico Raro" : "🐾 Tamagotchi Co-op"}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-fire/20 border border-fire/40 px-2.5 py-1 text-xs font-black text-fire-light">
          Nvl {pet.level}
        </span>
      </div>

      {/* TELA CENTRAL DO PET */}
      <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-dark-elevated via-dark-card to-dark-bg border border-white/15 p-6 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#ff5500_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute h-56 w-56 rounded-full bg-gradient-to-tr from-fire via-neon-purple to-neon-cyan blur-3xl pointer-events-none" />

        <motion.div whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }} whileTap={{ scale: 0.9 }} animate={{ y: [0, -12, 0] }} transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }} className="relative cursor-pointer select-none py-8 flex flex-col items-center">
          {pet.hat !== "none" && <span className="absolute -top-6 text-5xl drop-shadow-md animate-bounce">{hatEmojis[pet.hat]}</span>}
          <span className="text-8xl drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform">{petEmojis[pet.type] || "🐉"}</span>
          {pet.glasses !== "none" && <span className="absolute top-10 text-4xl drop-shadow-lg">{glassesEmojis[pet.glasses]}</span>}
          {pet.accessory === "chain" && <span className="absolute bottom-6 text-3xl">📿</span>}
        </motion.div>

        {/* Status Flutuantes */}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-1.5 bg-black/60 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10">
          <div><p className="text-[9px] uppercase font-bold text-neutral-400">Fome</p><div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${pet.hunger}%` }} /></div></div>
          <div><p className="text-[9px] uppercase font-bold text-neutral-400">Amor</p><div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-neon-pink" style={{ width: `${pet.happiness}%` }} /></div></div>
          <div><p className="text-[9px] uppercase font-bold text-neutral-400">Higiene</p><div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-neon-cyan" style={{ width: `${pet.hygiene}%` }} /></div></div>
          <div><p className="text-[9px] uppercase font-bold text-neutral-400">Energia</p><div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: `${pet.energy}%` }} /></div></div>
        </div>
      </div>

      {/* Selector de Abas do Pet */}
      <div className="flex justify-center space-x-1.5 bg-dark-card p-1 rounded-2xl border border-white/10">
        {[
          { id: "care", label: "Cuidar 🍗" },
          { id: "style", label: "Roupas 🎩" },
          { id: "breed", label: "Breeding 🧬" },
          { id: "coop", label: "Co-op 💌" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMenu(m.id as any)}
            className={`flex-1 py-2 rounded-xl text-[11px] font-black transition-all ${
              activeMenu === m.id ? "bg-fire text-white shadow-md" : "text-neutral-400 hover:text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeMenu === "care" && (
          <motion.div key="care" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3">
            <button onClick={() => { feedPet(); handleActionConfetti(); }} className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-amber-500/30 p-3.5 hover:bg-amber-500/10 transition-all"><div className="rounded-xl bg-amber-500/20 p-2 text-xl">🍎</div><div className="text-left"><p className="text-xs font-bold text-white">Comida</p><p className="text-[10px] text-neutral-400">+25 XP</p></div></button>
            <button onClick={() => { playPet(); handleActionConfetti(); }} className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-neon-pink/30 p-3.5 hover:bg-neon-pink/10 transition-all"><div className="rounded-xl bg-neon-pink/20 p-2 text-xl">🎾</div><div className="text-left"><p className="text-xs font-bold text-white">Brincar</p><p className="text-[10px] text-neutral-400">+20 XP</p></div></button>
            <button onClick={() => { cleanPet(); handleActionConfetti(); }} className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-neon-cyan/30 p-3.5 hover:bg-neon-cyan/10 transition-all"><div className="rounded-xl bg-neon-cyan/20 p-2 text-xl">🧼</div><div className="text-left"><p className="text-xs font-bold text-white">Banho</p><p className="text-[10px] text-neutral-400">+30 Higiene</p></div></button>
            <button onClick={() => { sleepPet(); handleActionConfetti(); }} className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-emerald-500/30 p-3.5 hover:bg-emerald-500/10 transition-all"><div className="rounded-xl bg-emerald-500/20 p-2 text-xl">💤</div><div className="text-left"><p className="text-xs font-bold text-white">Dormir</p><p className="text-[10px] text-neutral-400">100% Energia</p></div></button>
          </motion.div>
        )}

        {/* ABA BREEDING / EVOLUÇÃO */}
        {activeMenu === "breed" && (
          <motion.div key="breed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 bg-dark-card p-5 rounded-2xl border border-neon-purple/40 text-left shadow-xl relative overflow-hidden">
            <div className="flex items-center space-x-2 text-neon-purple font-black text-sm">
              <Dna className="h-5 w-5 animate-spin" />
              <span>Laboratório Cibernético de Breeding 🧬</span>
            </div>
            <p className="text-xs text-neutral-300">
              Cruze o seu mascote com o mascote de amigos ou eventos de fim de semana para gerar filhotes raros e quimeras cósmicas!
            </p>

            <input
              type="text"
              placeholder="Nome do futuro filhote (Ex: Neo-Alien)"
              value={hybridName}
              onChange={(e) => setHybridName(e.target.value)}
              className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-neon-purple focus:outline-hidden"
            />

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => handleBreed("alien")}
                className="rounded-2xl bg-gradient-to-br from-neon-purple/30 to-blue-600/30 border border-neon-purple p-3 text-center hover:scale-105 transition-all"
              >
                <span className="text-3xl block mb-1">👽</span>
                <span className="text-xs font-bold text-white">Cruzar com Alien</span>
                <span className="text-[9px] text-neon-cyan block mt-0.5">Raridade Cósmica 🪐</span>
              </button>

              <button
                onClick={() => handleBreed("phoenix")}
                className="rounded-2xl bg-gradient-to-br from-fire/30 to-amber-600/30 border border-fire p-3 text-center hover:scale-105 transition-all"
              >
                <span className="text-3xl block mb-1">🔥🦅</span>
                <span className="text-xs font-bold text-white">Cruzar com Fênix</span>
                <span className="text-[9px] text-fire-light block mt-0.5">Evolução Lendária 🔥</span>
              </button>
            </div>
          </motion.div>
        )}

        {activeMenu === "style" && (
          <motion.div key="style" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 bg-dark-card p-4 rounded-2xl border border-white/10 text-left">
            <div><p className="text-xs font-extrabold text-white mb-2">Chapéus Desbloqueados</p><div className="flex space-x-2">{[{ id: "none", label: "Nenhum" }, { id: "crown", label: "Coroa 👑" }, { id: "wizard", label: "Mago 🎩" }].map((i) => (<button key={i.id} onClick={() => updatePetStyle("hat", i.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${pet.hat === i.id ? "bg-fire text-white" : "bg-dark-elevated text-neutral-300"}`}>{i.label}</button>))}</div></div>
          </motion.div>
        )}

        {activeMenu === "coop" && (
          <motion.div key="coop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 bg-dark-card p-4 rounded-2xl border border-white/10 text-left">
            <h4 className="text-xs font-black text-white">Convidar Dupla do Chat 💌</h4>
            <div className="space-y-2">{chats.map((chat: any) => (<div key={chat.id} className="flex items-center justify-between rounded-xl bg-dark-elevated p-2.5"><span className="text-xs text-white">{chat.name}</span><button onClick={() => { sendPetInvite(chat.id, pet.name, pet.type); alert("Convite enviado!"); }} className="rounded-lg bg-fire px-2.5 py-1 text-xs font-bold text-white">Convidar</button></div>))}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
