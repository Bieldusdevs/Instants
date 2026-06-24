"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Instant, FriendChat, User } from "@/types";
import { CURRENT_USER_MOCK, INITIAL_INSTANTS, INITIAL_FRIENDS_CHATS } from "@/data/mockData";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  instants: Instant[];
  chats: FriendChat[];
  activeTab: "feed" | "camera" | "chat" | "profile";
  setActiveTab: (tab: "feed" | "camera" | "chat" | "profile") => void;
  addInstant: (mediaUrl: string, caption: string, mediaType?: "image" | "video") => void;
  likeInstant: (id: string) => void;
  replyToInstant: (instantId: string, text: string) => void;
  sendMessage: (friendId: string, text?: string, mediaUrl?: string) => void;
  loginAsDemo: (name?: string) => void;
  logout: () => void;
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [instants, setInstants] = useState<Instant[]>(INITIAL_INSTANTS);
  const [chats, setChats] = useState<FriendChat[]>(INITIAL_FRIENDS_CHATS);
  const [activeTab, setActiveTab] = useState<"feed" | "camera" | "chat" | "profile">("feed");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // Recupera sessão salva no localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("instants_demo_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const loginAsDemo = (name = "Alex Cyber") => {
    const newUser: User = {
      ...CURRENT_USER_MOCK,
      name,
      handle: `@${name.toLowerCase().replace(/\s+/g, ".")}`,
    };
    setUser(newUser);
    localStorage.setItem("instants_demo_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("instants_demo_user");
  };

  const addInstant = (mediaUrl: string, caption: string, mediaType: "image" | "video" = "image") => {
    if (!user) return;

    const newInst: Instant = {
      id: `inst-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userHandle: user.handle,
      userImage: user.image,
      mediaUrl,
      mediaType,
      caption,
      createdAt: "agora mesmo",
      timestamp: Date.now(),
      likes: 0,
      hasLiked: false,
      streakDays: user.streak + 1,
      location: "Meu Local ✨",
      repliesCount: 0,
      reactions: [],
    };

    // Atualiza o Foguinho da conta 🔥
    const updatedUser = {
      ...user,
      streak: user.streak + 1,
      instantsCount: user.instantsCount + 1,
    };
    setUser(updatedUser);
    localStorage.setItem("instants_demo_user", JSON.stringify(updatedUser));

    setInstants((prev) => [newInst, ...prev]);
  };

  const likeInstant = (id: string) => {
    setInstants((prev) =>
      prev.map((inst) => {
        if (inst.id === id) {
          const hasLiked = !inst.hasLiked;
          return {
            ...inst,
            hasLiked,
            likes: hasLiked ? inst.likes + 1 : inst.likes - 1,
          };
        }
        return inst;
      })
    );
  };

  const replyToInstant = (instantId: string, text: string) => {
    const targetInstant = instants.find((i) => i.id === instantId);
    if (!targetInstant || !user) return;

    setInstants((prev) =>
      prev.map((inst) => (inst.id === instantId ? { ...inst, repliesCount: inst.repliesCount + 1 } : inst))
    );

    const friendId = targetInstant.userId;
    sendMessage(friendId, `📸 Resposta ao Instant: "${text}"`);
  };

  const sendMessage = (friendId: string, text?: string, mediaUrl?: string) => {
    if (!user) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      text,
      mediaUrl,
      mediaType: mediaUrl ? ("image" as const) : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === friendId) {
          return {
            ...chat,
            lastMessage: text || "📸 Foto enviada",
            lastMessageTime: "Agora",
            messages: [...chat.messages, newMsg],
          };
        }
        return chat;
      })
    );

    // Simulação de resposta do amigo após 2 segundos!
    setTimeout(() => {
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === friendId) {
            const replies = [
              "Ficou brabo demais 🔥🔥",
              "Amei!! Manda mais",
              "Caramba, surreal essa foto ⚡️",
              "Olha o foguinho subindo 🔥🚀",
              "Tô entrando no app agora pra postar tbm!",
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            const autoReplyMsg = {
              id: `msg-auto-${Date.now()}`,
              senderId: friendId,
              text: randomReply,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isMe: false,
            };
            return {
              ...chat,
              streak: chat.streak + 1,
              lastMessage: randomReply,
              lastMessageTime: "Agora",
              messages: [...chat.messages, autoReplyMsg],
            };
          }
          return chat;
        })
      );
    }, 2000);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        instants,
        chats,
        activeTab,
        setActiveTab,
        addInstant,
        likeInstant,
        replyToInstant,
        sendMessage,
        loginAsDemo,
        logout,
        selectedChatId,
        setSelectedChatId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
