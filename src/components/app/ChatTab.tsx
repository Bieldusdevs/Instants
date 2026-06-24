"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Flame, Send, Camera, ArrowLeft, Image as ImageIcon, Sparkles, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function ChatTab() {
  const { chats, selectedChatId, setSelectedChatId, sendMessage } = useApp();
  const [inputText, setInputText] = useState("");

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
    sendMessage(selectedChatId, "📸 Foto instantânea enviada!", pic);
  };

  return (
    <div className="mx-auto max-w-md pb-24 pt-2 px-3 min-h-[80vh]">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          /* LISTA DE CONVERSAS */
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
          /* TELA DE CHAT PRIVADO */
          <motion.div
            key="chat-room"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-[78vh] bg-dark-card/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-dark-card/90">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedChatId(null)}
                  className="rounded-full p-1.5 text-neutral-300 hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <img src={activeChat.avatar} alt={activeChat.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <h3 className="text-xs font-bold text-white">{activeChat.name}</h3>
                  <p className="text-[10px] text-emerald-400 font-medium">Online no Instants ✨</p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 rounded-full bg-fire/20 border border-fire/40 px-2.5 py-1 text-xs font-black text-fire-light">
                <Flame className="h-3.5 w-3.5 fill-fire text-fire animate-bounce" />
                <span>{activeChat.streak} dias seguidos</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-center my-2">
                <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-neutral-400">
                  🔥 Ofensiva ativa! Troquem pelo menos uma foto ou mensagem a cada 24h.
                </span>
              </div>

              {activeChat?.messages?.map((msg: any) => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs shadow-md ${
                      msg.isMe
                        ? "bg-gradient-to-tr from-fire to-fire-glow text-white rounded-br-xs font-medium"
                        : "bg-dark-elevated border border-white/10 text-neutral-200 rounded-bl-xs"
                    }`}
                  >
                    {msg.mediaUrl && (
                      <div className="mb-2 overflow-hidden rounded-xl border border-white/20">
                        <img src={msg.mediaUrl} alt="Instant sent" className="w-full object-cover max-h-48" />
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

            <div className="p-3 border-t border-white/10 bg-dark-card/90 space-y-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSendInstantPhoto}
                  className="group flex items-center space-x-1.5 rounded-xl bg-neon-purple/20 border border-neon-purple/40 px-3 py-2 text-xs font-bold text-neon-purple hover:bg-neon-purple/30 transition-all"
                  title="Enviar Foto Instantânea"
                >
                  <Camera className="h-4 w-4 text-neon-purple group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Foto ⚡️</span>
                </button>

                <input
                  type="text"
                  placeholder="Escreva uma mensagem..."
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
