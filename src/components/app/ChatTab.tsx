"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Flame, Send, Camera, ArrowLeft, CheckCheck, Gamepad2, Play, Trophy, Check, X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function ChatTab() {
  const { chats, selectedChatId, setSelectedChatId, sendMessage, sendGameInvite } = useApp();
  const [inputText, setInputText] = useState("");
  const [showGameDrawer, setShowGameDrawer] = useState(false);
  const [activeMiniGame, setActiveMiniGame] = useState<string | null>(null);
  const [gameScoreMe, setGameScoreMe] = useState(0);
  const [gameScoreFriend, setGameScoreFriend] = useState(0);

  const activeChat = chats.find((c: any) => c.id === selectedChatId);

  const handleSend = () => {
    if (!inputText.trim() || !selectedChatId) return;
    sendMessage(selectedChatId, inputText);
    setInputText("");
  };

  const handleSendInstantPhoto = () => {
    if (!selectedChatId) return;
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#ff5500", "#8a2be2"],
    });

    const randomSecretPics = [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    ];
    const pic = randomSecretPics[Math.floor(Math.random() * randomSecretPics.length)];
    sendMessage(selectedChatId, "📸 Foto instantânea enviada pro Story Privado!", pic);
  };

  const handleStartGame = (gameType: any, gameName: string) => {
    if (!selectedChatId) return;
    sendGameInvite(selectedChatId, gameType, gameName);
    setShowGameDrawer(false);
    setActiveMiniGame(gameType);
    setGameScoreMe(0);
    setGameScoreFriend(0);
  };

  const handlePlayMiniGameStep = () => {
    // Aumenta ponto e simula o oponente ganhando também!
    setGameScoreMe((prev) => prev + 1);
    if (Math.random() > 0.4) {
      setGameScoreFriend((prev) => prev + 1);
    }
    confetti({ particleCount: 15, spread: 30, origin: { y: 0.6 }, colors: ["#00f0ff"] });
  };

  const gamesList = [
    { type: "pingpong", name: "Ping Pong Neon 🏓", desc: "Rebata a bola em velocidade turbo" },
    { type: "soccer", name: "Pênalti Master ⚽️", desc: "Chute no ângulo e drible o goleiro" },
    { type: "checkers", name: "Xadrez / Damas ♟️", desc: "Duelo estratégico no tabuleiro" },
    { type: "race", name: "Turbo Corrida 🏎️", desc: "Aperte rápido para acelerar" },
    { type: "space", name: "Guerra Espacial 🚀👾", desc: "Destrua naves invasoras" },
  ];

  return (
    <div className="mx-auto max-w-md pb-24 pt-2 px-3 min-h-[80vh]">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          <motion.div
            key="chat-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black text-white">Mensagens & Amigos 💬</h2>
              <span className="text-xs font-bold text-neutral-400">{chats.length} conexões</span>
            </div>

            <div className="space-y-2.5">
              {chats.map((chat: any) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedChatId(chat.id)}
                  className="cursor-pointer overflow-hidden rounded-2xl bg-dark-card border border-white/10 p-3.5 shadow-xl backdrop-blur-md flex items-center justify-between transition-colors hover:border-white/20"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="relative shrink-0">
                      <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover border border-white/10" />
                      {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-dark-card" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center space-x-1.5">
                        <h3 className="text-sm font-bold text-white truncate">{chat.name}</h3>
                        <span className="text-[10px] text-neutral-500">{chat.handle}</span>
                      </div>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">{chat.lastMessage}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 space-y-1">
                    <span className="flex items-center space-x-1 rounded-full bg-fire/15 border border-fire/30 px-2 py-0.5 text-[11px] font-black text-fire-light shadow-[0_0_8px_rgba(255,85,0,0.2)]">
                      <Flame className="h-3 w-3 fill-fire text-fire animate-fire-flicker" />
                      <span>{chat.streak}d</span>
                    </span>
                    <span className="text-[10px] text-neutral-500">{chat.lastMessageTime}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-room"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-[78vh] bg-dark-card/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl relative"
          >
            {/* Header da conversa */}
            <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-dark-card/90">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => { setSelectedChatId(null); setActiveMiniGame(null); }}
                  className="rounded-full p-1.5 text-neutral-300 hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <img src={activeChat.avatar} alt={activeChat.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <h3 className="text-xs font-bold text-white">{activeChat.name}</h3>
                  <p className="text-[10px] text-emerald-400 font-medium">Online • Compartilha Pet 🐾</p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 rounded-full bg-fire/20 border border-fire/40 px-2.5 py-1 text-xs font-black text-fire-light">
                <Flame className="h-3.5 w-3.5 fill-fire text-fire animate-bounce" />
                <span>{activeChat.streak} dias seguidos</span>
              </div>
            </div>

            {/* Mensagens e Mini Jogos */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              <div className="text-center my-1">
                <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-neutral-400">
                  🐾 Cuidem juntos do Pet virtual enviando fotos diárias!
                </span>
              </div>

              {activeChat?.messages?.map((msg: any) => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-md ${
                      msg.isMe
                        ? "bg-gradient-to-tr from-fire to-fire-glow text-white rounded-br-xs font-medium"
                        : "bg-dark-elevated border border-white/10 text-neutral-200 rounded-bl-xs"
                    }`}
                  >
                    {/* Foto privada */}
                    {msg.mediaUrl && (
                      <div className="mb-2 overflow-hidden rounded-xl border border-white/20">
                        <img src={msg.mediaUrl} alt="Instant sent" className="w-full object-cover max-h-48" />
                      </div>
                    )}

                    {/* Convite de Pet Co-op */}
                    {msg.petInvite && (
                      <div className="rounded-xl bg-black/40 p-3 border border-fire/40 space-y-2 text-center my-1">
                        <p className="text-xs font-bold text-fire-light">💌 Convite Tamagotchi Dupla</p>
                        <p className="text-[11px] text-neutral-300">
                          Vamos cuidar juntos do pet <span className="font-bold text-white">{msg.petInvite.petName}</span>!
                        </p>
                        <button
                          onClick={() => {
                            confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
                            alert("Convite aceito! Vocês são donos do animalzinho agora.");
                          }}
                          className="w-full rounded-lg bg-fire py-1.5 text-xs font-black text-white hover:bg-fire-glow shadow-[0_0_10px_#ff5500]"
                        >
                          Aceitar Pet 🐾
                        </button>
                      </div>
                    )}

                    {/* Convite de Mini Jogo */}
                    {msg.gameInvite && (
                      <div className="rounded-xl bg-dark-bg/80 p-3 border border-neon-cyan/40 space-y-2 text-center my-1 min-w-[200px]">
                        <div className="flex items-center justify-center space-x-1.5 text-neon-cyan font-black">
                          <Gamepad2 className="h-4 w-4 animate-bounce" />
                          <span>{msg.gameInvite.gameName}</span>
                        </div>
                        <p className="text-[10px] text-neutral-400">Partida instantânea no chat</p>
                        <button
                          onClick={() => setActiveMiniGame(msg.gameInvite.gameType)}
                          className="flex items-center justify-center space-x-1.5 w-full rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 py-2 text-xs font-black text-dark-bg hover:scale-105 transition-all shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                        >
                          <Play className="h-3.5 w-3.5 fill-dark-bg" />
                          <span>Abrir Jogo Agora</span>
                        </button>
                      </div>
                    )}

                    {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                  </div>
                  <div className="flex items-center space-x-1 mt-1 px-1 text-[9px] text-neutral-500">
                    <span>{msg.timestamp}</span>
                    {msg.isMe && <CheckCheck className="h-3 w-3 text-neon-cyan" />}
                  </div>
                </div>
              ))}
            </div>

            {/* MINI JOGO OVERLAY JOGÁVEL NO CHAT */}
            <AnimatePresence>
              {activeMiniGame && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  className="absolute inset-x-0 bottom-0 top-14 z-50 bg-dark-bg/95 backdrop-blur-2xl p-4 flex flex-col justify-between border-t border-neon-cyan/30"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2">
                      <Gamepad2 className="h-5 w-5 text-neon-cyan animate-pulse" />
                      <h4 className="text-sm font-black text-white uppercase tracking-wider">Duelo com {activeChat.name}</h4>
                    </div>
                    <button onClick={() => setActiveMiniGame(null)} className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Arena do Jogo */}
                  <div className="flex-1 flex flex-col items-center justify-center space-y-6 my-4">
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-xs text-neutral-400 font-bold">Você</p>
                        <p className="text-5xl font-black text-neon-cyan drop-shadow-[0_0_15px_#00f0ff]">{gameScoreMe}</p>
                      </div>
                      <span className="text-2xl font-black text-neutral-600">VS</span>
                      <div className="text-center">
                        <p className="text-xs text-neutral-400 font-bold">{activeChat.name}</p>
                        <p className="text-5xl font-black text-neon-pink drop-shadow-[0_0_15px_#ff007f]">{gameScoreFriend}</p>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-dark-card border border-white/15 p-6 w-full max-w-xs text-center space-y-4 shadow-2xl">
                      <span className="text-6xl animate-bounce block">
                        {activeMiniGame === "pingpong" && "🏓"}
                        {activeMiniGame === "soccer" && "⚽️"}
                        {activeMiniGame === "race" && "🏎️"}
                        {activeMiniGame === "space" && "🚀"}
                        {activeMiniGame === "checkers" && "♟️"}
                      </span>
                      <p className="text-xs text-neutral-300">
                        Toque repetidamente na tela para marcar pontos antes que o tempo acabe!
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePlayMiniGameStep}
                        className="w-full rounded-2xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple py-4 text-sm font-black text-dark-bg shadow-[0_0_25px_rgba(0,240,255,0.6)] select-none"
                      >
                        JOGADA RÁPIDA ⚡️ (+1 pt)
                      </motion.button>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500 text-center">Os pontos são sincronizados instantaneamente na conversa.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Bar de envio e convite de jogos */}
            <div className="p-3 border-t border-white/10 bg-dark-card/90 space-y-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowGameDrawer(!showGameDrawer)}
                  className="group flex items-center space-x-1.5 rounded-xl bg-neon-cyan/20 border border-neon-cyan/40 px-3 py-2 text-xs font-black text-neon-cyan hover:bg-neon-cyan/30 transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                >
                  <Gamepad2 className="h-4 w-4 text-neon-cyan group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">Jogar</span>
                </button>

                <button
                  onClick={handleSendInstantPhoto}
                  className="group flex items-center space-x-1.5 rounded-xl bg-neon-purple/20 border border-neon-purple/40 px-3 py-2 text-xs font-bold text-neon-purple hover:bg-neon-purple/30 transition-all"
                  title="Enviar Foto Instantânea"
                >
                  <Camera className="h-4 w-4 text-neon-purple group-hover:scale-110 transition-transform" />
                </button>

                <input
                  type="text"
                  placeholder="Escreva no chat..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 rounded-xl bg-dark-elevated border border-white/15 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-fire focus:outline-hidden"
                />

                <button
                  onClick={handleSend}
                  className="rounded-xl bg-fire p-2 text-white shadow-[0_0_12px_#ff5500] hover:bg-fire-glow transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* DRAWER DE SELEÇÃO DE JOGOS */}
              <AnimatePresence>
                {showGameDrawer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 border-t border-white/10 space-y-2 overflow-hidden"
                  >
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Escolha um Mini Jogo para mandar no chat:</p>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {gamesList.map((g) => (
                        <button
                          key={g.type}
                          onClick={() => handleStartGame(g.type, g.name)}
                          className="flex flex-col items-start rounded-xl bg-dark-elevated p-2.5 border border-white/10 hover:border-neon-cyan/60 hover:bg-neon-cyan/10 transition-all text-left"
                        >
                          <span className="text-xs font-bold text-white">{g.name}</span>
                          <span className="text-[9px] text-neutral-400 mt-0.5 line-clamp-1">{g.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
