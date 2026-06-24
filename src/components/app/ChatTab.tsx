"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Flame, Send, Camera, ArrowLeft, CheckCheck, Gamepad2, Play, Trophy, X, Lock, Sparkles, Film, Mic, Bomb, Eye, PartyPopper, Clock, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function ChatTab() {
  const { chats, selectedChatId, setSelectedChatId, sendMessage, sendGameInvite, sendVoiceMessage, sendSecretViewOnce, viewSecretMessage, reactToMessage, triggerAiMemory } = useApp();
  const [inputText, setInputText] = useState("");
  
  // Modais / Drawers
  const [showGameDrawer, setShowGameDrawer] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretText, setSecretText] = useState("");
  const [reactingMsgId, setReactingMsgId] = useState<string | null>(null);

  // Mini Jogo no Chat
  const [activeMiniGame, setActiveMiniGame] = useState<string | null>(null);
  const [gameScoreMe, setGameScoreMe] = useState(0);
  const [gameScoreFriend, setGameScoreFriend] = useState(0);

  const activeChat = chats.find((c: any) => c.id === selectedChatId);

  const handleSend = () => {
    if (!inputText.trim() || !selectedChatId) return;
    sendMessage(selectedChatId, inputText);
    setInputText("");
  };

  const handleSendSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretText.trim() || !selectedChatId) return;
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    sendSecretViewOnce(selectedChatId, secretText);
    setShowSecretModal(false);
    setSecretText("");
  };

  const handleSendVoice = () => {
    if (!selectedChatId) return;
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 } });
    sendVoiceMessage(selectedChatId, Math.floor(Math.random() * 10) + 5); // 5 a 15 seg
  };

  const handleStartGame = (gameType: any, gameName: string) => {
    if (!selectedChatId) return;
    sendGameInvite(selectedChatId, gameType, gameName);
    setShowGameDrawer(false);
    setActiveMiniGame(gameType);
    setGameScoreMe(0); setGameScoreFriend(0);
  };

  const handlePlayMiniGameStep = () => {
    setGameScoreMe((prev) => prev + 1);
    if (Math.random() > 0.4) setGameScoreFriend((prev) => prev + 1);
    confetti({ particleCount: 15, spread: 30, origin: { y: 0.6 }, colors: ["#00f0ff"] });
  };

  const gamesList = [
    { type: "quiz", name: "Quiz Besties ❓🧠", desc: "Perguntas exclusivas sobre vocês" },
    { type: "guess_pic", name: "Quem Mandou a Foto? 🕵️‍♂️📸", desc: "Adivinhe pela foto borrada" },
    { type: "pingpong", name: "Ping Pong Neon 🏓", desc: "Rebata a bola em velocidade turbo" },
    { type: "soccer", name: "Pênalti Master ⚽️", desc: "Chute no ângulo" },
    { type: "space", name: "Guerra Espacial 🚀👾", desc: "Destrua naves invasoras" },
  ];

  const reactionEmojis = ["❤️", "🔥", "🚀", "💩", "⚡️", "💜"];

  return (
    <div className="mx-auto max-w-md pb-24 pt-2 px-3 min-h-[80vh]">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          /* LISTA DE CONVERSAS E SALAS DE FESTA */
          <motion.div key="chat-list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black text-white">Mensagens & Salas 🎉💬</h2>
              <span className="text-xs font-bold text-neutral-400">{chats.length} chats ativos</span>
            </div>

            <div className="space-y-2.5">
              {chats.map((chat: any) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`cursor-pointer overflow-hidden rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex items-center justify-between transition-colors border ${
                    chat.isTemporaryRoom ? "bg-gradient-to-r from-neon-pink/20 to-dark-card border-neon-pink/50" : "bg-dark-card border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="relative shrink-0">
                      <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover border border-white/10" />
                      {chat.isOnline && <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-dark-card" />}
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center space-x-1.5">
                        <h3 className="text-sm font-bold text-white truncate">{chat.name}</h3>
                        {chat.isTemporaryRoom ? (
                          <span className="rounded-full bg-neon-pink px-1.5 py-0.5 text-[8px] font-black text-white animate-pulse">
                            ⏳ {chat.roomExpiresIn}
                          </span>
                        ) : (
                          <span className="rounded-full bg-neon-pink/20 border border-neon-pink/40 px-1.5 py-0.5 text-[9px] font-black text-neon-pink">
                            Nvl {chat.friendshipLevel || 1} 💖
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">{chat.lastMessage}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 space-y-1">
                    <span className="flex items-center space-x-1 rounded-full bg-fire/15 border border-fire/30 px-2 py-0.5 text-[11px] font-black text-fire-light">
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
          /* TELA DE CHAT PRIVADO OU SALA DE FESTA */
          <motion.div key="chat-room" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-[78vh] bg-dark-card/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl relative">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-dark-card/95">
              <div className="flex items-center space-x-2.5">
                <button onClick={() => { setSelectedChatId(null); setActiveMiniGame(null); }} className="rounded-full p-1 text-neutral-300 hover:bg-white/10">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <img src={activeChat.avatar} alt={activeChat.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <div className="flex items-center space-x-1">
                    <h3 className="text-xs font-bold text-white">{activeChat.name}</h3>
                    {activeChat.isTemporaryRoom ? (
                      <span className="text-[9px] bg-neon-pink px-1 rounded text-white font-black">Expira em {activeChat.roomExpiresIn}</span>
                    ) : (
                      <span className="text-[10px] text-neon-pink font-black">Nvl {activeChat.friendshipLevel} 💖</span>
                    )}
                  </div>
                  <p className="text-[9px] text-emerald-400 font-medium">Ranking Besties Privado 🏆</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button onClick={() => triggerAiMemory(activeChat.id)} className="flex items-center space-x-1 rounded-xl bg-neon-purple/20 border border-neon-purple/40 px-2 py-1 text-[10px] font-black text-neon-purple hover:scale-105">
                  <Film className="h-3.5 w-3.5 animate-spin" />
                  <span>IA Memória</span>
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center my-1">
                <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-neutral-400">
                  👆 Segure em qualquer balão para mandar reações exclusivas!
                </span>
              </div>

              {activeChat?.messages?.map((msg: any) => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"} relative group`}>
                  <div
                    onClick={() => setReactingMsgId(reactingMsgId === msg.id ? null : msg.id)}
                    className={`cursor-pointer max-w-[85%] rounded-2xl p-3 text-xs shadow-md transition-transform ${
                      msg.isMe ? "bg-gradient-to-tr from-fire to-fire-glow text-white rounded-br-xs font-medium" : "bg-dark-elevated border border-white/10 text-neutral-200 rounded-bl-xs"
                    }`}
                  >
                    {/* ÁUDIO RÁPIDO (5-15s) */}
                    {msg.mediaType === "voice" && msg.voiceMessage && (
                      <div className="flex items-center space-x-2 py-1 min-w-[160px]">
                        <button onClick={() => alert(`▶️ Tocando áudio rápido de ${msg.voiceMessage.duration}s!`)} className="rounded-full bg-white/20 p-2 text-white hover:scale-110 shrink-0">
                          <Play className="h-4 w-4 fill-white" />
                        </button>
                        <div className="flex items-center space-x-1 flex-1 h-6 overflow-hidden">
                          {msg.voiceMessage.waves.map((w: number, i: number) => (
                            <span key={i} className="w-1 bg-white/80 rounded-full transition-all animate-pulse" style={{ height: `${w}%` }} />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-white">{msg.voiceMessage.duration}s</span>
                      </div>
                    )}

                    {/* MENSAGEM SECRETA (VIEW ONCE) */}
                    {msg.mediaType === "secret_once" && msg.secretMessage && (
                      <div className="rounded-xl bg-black/70 p-3 border border-red-500/60 text-center my-1 min-w-[190px]">
                        <div className="flex items-center justify-center space-x-1.5 text-red-400 font-black text-xs mb-1">
                          <Bomb className="h-4 w-4 animate-bounce" />
                          <span>Mensagem Secreta (1x)</span>
                        </div>
                        {!msg.secretMessage.viewed ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              confetti({ particleCount: 50, spread: 80, origin: { y: 0.5 } });
                              alert(`💣 MENSAGEM SECRETA REVELADA:\n\n"${msg.secretMessage.text}"\n\n⚠️ Esta mensagem agora virou fumaça e foi excluída permanentemente!`);
                              viewSecretMessage(activeChat.id, msg.id);
                            }}
                            className="w-full rounded-lg bg-red-500/20 border border-red-500/40 py-2 text-xs font-black text-red-300 hover:bg-red-500/30 flex items-center justify-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Abrir Agora 💣</span>
                          </button>
                        ) : (
                          <p className="text-[10px] font-mono text-neutral-500 italic">💨 Esta mensagem secreta já foi visualizada e desapareceu.</p>
                        )}
                      </div>
                    )}

                    {/* VÍDEO DE IA */}
                    {msg.mediaType === "ai_memory" && (
                      <div className="rounded-xl bg-gradient-to-br from-neon-purple/40 to-blue-600/40 p-3 border border-neon-purple text-center my-1">
                        <p className="text-neon-cyan font-black text-xs mb-1">🎞️ Vídeo de IA das Nossas Vibrações</p>
                        <img src={msg.mediaUrl} alt="AI Memory" className="w-full rounded-lg object-cover max-h-36 mb-1" />
                        <button onClick={() => alert("🎬 Abrindo Player de IA em tela cheia!")} className="w-full rounded-lg bg-neon-purple py-1 text-[11px] font-black text-white">Assistir Vídeo</button>
                      </div>
                    )}

                    {msg.mediaUrl && msg.mediaType !== "ai_memory" && msg.mediaType !== "secret_once" && !msg.timeCapsule && (
                      <div className="mb-2 overflow-hidden rounded-xl border border-white/20">
                        <img src={msg.mediaUrl} alt="Instant sent" className="w-full object-cover max-h-48" />
                      </div>
                    )}

                    {msg.gameInvite && (
                      <div className="rounded-xl bg-dark-bg/80 p-3 border border-neon-cyan/40 text-center my-1 min-w-[180px]">
                        <p className="text-neon-cyan font-black text-xs">🎮 {msg.gameInvite.gameName}</p>
                        <button onClick={() => setActiveMiniGame(msg.gameInvite.gameType)} className="w-full rounded-lg bg-neon-cyan py-1 text-xs font-black text-dark-bg mt-1">Jogar Duelo</button>
                      </div>
                    )}

                    {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                  </div>

                  {/* Emojis Reagidos */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex items-center space-x-1 -mt-2 z-10 ml-2">
                      {msg.reactions.map((r: any, idx: number) => (
                        <span key={idx} className="rounded-full bg-dark-card border border-white/20 px-1.5 py-0.5 text-[10px] shadow-md animate-bounce">{r.emoji}</span>
                      ))}
                    </div>
                  )}

                  {/* Popover de Reações Personalizadas */}
                  <AnimatePresence>
                    {reactingMsgId === msg.id && (
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="absolute -top-10 z-50 flex items-center space-x-1.5 bg-dark-card/95 border border-white/20 p-1.5 rounded-full shadow-2xl backdrop-blur-xl">
                        {reactionEmojis.map((emj) => (
                          <button key={emj} onClick={() => { reactToMessage(activeChat.id, msg.id, emj); setReactingMsgId(null); }} className="p-1 text-base hover:scale-125 transition-transform">{emj}</button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="text-[8px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* MINI JOGO OVERLAY */}
            <AnimatePresence>
              {activeMiniGame && (
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute inset-x-0 bottom-0 top-12 z-50 bg-dark-bg/95 p-4 flex flex-col justify-between border-t border-neon-cyan">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2"><h4 className="text-xs font-black text-neon-cyan">Duelo no Chat</h4><button onClick={() => setActiveMiniGame(null)}><X className="h-5 w-5" /></button></div>
                  <div className="text-center space-y-4 my-auto"><p className="text-4xl font-black text-white">{gameScoreMe} VS {gameScoreFriend}</p><button onClick={handlePlayMiniGameStep} className="w-full py-4 rounded-2xl bg-neon-cyan text-dark-bg font-black text-base">MARCAR PONTO ⚡️ (+1 pt)</button></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MODAL MENSAGEM SECRETA 1x */}
            <AnimatePresence>
              {showSecretModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-center text-left">
                  <form onSubmit={handleSendSecretSubmit} className="space-y-4 bg-dark-card p-5 rounded-3xl border border-red-500/50 shadow-2xl">
                    <div className="flex items-center justify-between"><h4 className="text-sm font-black text-red-400 flex items-center space-x-1"><Bomb className="h-4 w-4" /><span>Mensagem Secreta (View Once) 💣👁️</span></h4><button type="button" onClick={() => setShowSecretModal(false)}><X className="h-4 w-4 text-neutral-400" /></button></div>
                    <p className="text-[11px] text-neutral-300">Esta mensagem desaparecerá permanentemente em fumaça após o amigo abrir!</p>
                    <textarea required placeholder="Digite o segredo bombástico..." value={secretText} onChange={(e) => setSecretText(e.target.value)} className="w-full h-24 rounded-xl bg-dark-elevated border border-white/15 p-3 text-xs text-white" />
                    <button type="submit" className="w-full rounded-2xl bg-red-500 py-3 text-xs font-black text-white shadow-[0_0_15px_#ef4444]">Selar & Enviar 💣</button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom bar */}
            <div className="p-3 border-t border-white/10 bg-dark-card/95 space-y-2">
              <div className="flex items-center space-x-1.5">
                <button onClick={handleSendVoice} className="flex items-center space-x-1 rounded-xl bg-neon-purple/20 border border-neon-purple/40 p-2 text-xs font-black text-neon-purple hover:bg-neon-purple/30" title="Áudio Rápido 5-15s">
                  <Mic className="h-4 w-4" />
                </button>

                <button onClick={() => setShowSecretModal(true)} className="flex items-center space-x-1 rounded-xl bg-red-500/20 border border-red-500/40 p-2 text-xs font-black text-red-400 hover:bg-red-500/30" title="Mensagem Secreta Única">
                  <Bomb className="h-4 w-4" />
                </button>

                <button onClick={() => setShowGameDrawer(!showGameDrawer)} className="flex items-center space-x-1 rounded-xl bg-neon-cyan/20 border border-neon-cyan/40 p-2 text-xs font-black text-neon-cyan hover:bg-neon-cyan/30" title="Jogos no Chat">
                  <Gamepad2 className="h-4 w-4" />
                </button>

                <input type="text" placeholder="Mensagem..." value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1 rounded-xl bg-dark-elevated border border-white/15 px-3 py-2 text-xs text-white focus:outline-hidden" />
                <button onClick={handleSend} className="rounded-xl bg-fire p-2 text-white shadow-[0_0_10px_#ff5500]"><Send className="h-4 w-4" /></button>
              </div>

              <AnimatePresence>
                {showGameDrawer && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {gamesList.map((g) => (<button key={g.type} onClick={() => handleStartGame(g.type, g.name)} className="rounded-xl bg-dark-elevated p-2 border border-white/10 text-left hover:border-neon-cyan"><span className="text-xs font-bold text-white block">{g.name}</span><span className="text-[9px] text-neutral-400">{g.desc}</span></button>))}
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
