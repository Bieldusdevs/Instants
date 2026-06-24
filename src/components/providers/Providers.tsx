"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Instant, FriendChat, User, Pet, GameInvite } from "@/types";
import { CURRENT_USER_MOCK, INITIAL_INSTANTS, INITIAL_FRIENDS_CHATS, INITIAL_MY_PET } from "@/data/mockData";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  pet: Pet;
  setPet: React.Dispatch<React.SetStateAction<Pet>>;
  instants: Instant[];
  chats: FriendChat[];
  activeTab: "feed" | "camera" | "pet" | "chat" | "profile";
  setActiveTab: (tab: "feed" | "camera" | "pet" | "chat" | "profile") => void;
  addInstant: (mediaUrl: string, caption: string, mediaType?: "image" | "video") => void;
  likeInstant: (id: string) => void;
  replyToInstant: (instantId: string, text: string) => void;
  sendMessage: (friendId: string, text?: string, mediaUrl?: string) => void;
  sendGameInvite: (friendId: string, gameType: GameInvite["gameType"], gameName: string) => void;
  sendPetInvite: (friendId: string, petName: string, petType: Pet["type"]) => void;
  feedPet: () => void;
  playPet: () => void;
  cleanPet: () => void;
  sleepPet: () => void;
  updatePetStyle: (slot: "hat" | "glasses" | "accessory", value: string) => void;
  registerAccount: (name: string, handle: string, petName: string, petType: Pet["type"]) => void;
  loginAccount: (handle: string) => void;
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
  const [pet, setPet] = useState<Pet>(INITIAL_MY_PET);
  const [instants, setInstants] = useState<Instant[]>(INITIAL_INSTANTS);
  const [chats, setChats] = useState<FriendChat[]>(INITIAL_FRIENDS_CHATS);
  const [activeTab, setActiveTab] = useState<"feed" | "camera" | "pet" | "chat" | "profile">("feed");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("instants_user_v2");
    const savedPet = localStorage.getItem("instants_pet_v2");
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) {}
    }
    if (savedPet) {
      try { setPet(JSON.parse(savedPet)); } catch (e) {}
    }
  }, []);

  const saveUserAndPet = (u: User | null, p: Pet) => {
    if (u) localStorage.setItem("instants_user_v2", JSON.stringify(u));
    localStorage.setItem("instants_pet_v2", JSON.stringify(p));
  };

  const registerAccount = (name: string, handle: string, petName: string, petType: Pet["type"]) => {
    const newUser: User = {
      ...CURRENT_USER_MOCK,
      name: name || "Alex Cyber",
      handle: handle.startsWith("@") ? handle : `@${handle}`,
    };
    const newPet: Pet = {
      ...INITIAL_MY_PET,
      name: petName || "Byte",
      type: petType || "dragon",
      owners: [{ name: newUser.name, avatar: newUser.image }],
      isShared: false,
    };
    setUser(newUser);
    setPet(newPet);
    saveUserAndPet(newUser, newPet);
  };

  const loginAccount = (handle: string) => {
    const defaultName = handle ? handle.replace("@", "").toUpperCase() : "Alex Cyber";
    const loggedUser: User = {
      ...CURRENT_USER_MOCK,
      name: defaultName,
      handle: handle.startsWith("@") ? handle : `@${handle || "alex.instants"}`,
    };
    setUser(loggedUser);
    saveUserAndPet(loggedUser, pet);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("instants_user_v2");
  };

  const feedPet = () => {
    setPet((prev: any) => {
      const next = { ...prev, hunger: Math.min(100, prev.hunger + 25), xp: prev.xp + 15 };
      saveUserAndPet(user, next);
      return next;
    });
  };

  const playPet = () => {
    setPet((prev: any) => {
      const next = { ...prev, happiness: Math.min(100, prev.happiness + 25), energy: Math.max(0, prev.energy - 10), xp: prev.xp + 20 };
      saveUserAndPet(user, next);
      return next;
    });
  };

  const cleanPet = () => {
    setPet((prev: any) => {
      const next = { ...prev, hygiene: Math.min(100, prev.hygiene + 30), xp: prev.xp + 10 };
      saveUserAndPet(user, next);
      return next;
    });
  };

  const sleepPet = () => {
    setPet((prev: any) => {
      const next = { ...prev, energy: 100 };
      saveUserAndPet(user, next);
      return next;
    });
  };

  const updatePetStyle = (slot: "hat" | "glasses" | "accessory", value: string) => {
    setPet((prev: any) => {
      const next = { ...prev, [slot]: value };
      saveUserAndPet(user, next);
      return next;
    });
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
      location: "Meu Story ✨",
      repliesCount: 0,
      reactions: [],
    };

    const updatedUser = { ...user, streak: user.streak + 1, instantsCount: user.instantsCount + 1 };
    setUser(updatedUser);

    // Tirar foto dá +30 de comida e felicidade pro Pet co-op! 🐾
    setPet((prev: any) => {
      const next = { ...prev, hunger: Math.min(100, prev.hunger + 30), happiness: Math.min(100, prev.happiness + 30) };
      saveUserAndPet(updatedUser, next);
      return next;
    });

    setInstants((prev: any) => [newInst, ...prev]);
  };

  const likeInstant = (id: string) => {
    setInstants((prev: any) =>
      prev.map((inst: any) => {
        if (inst.id === id) {
          const hasLiked = !inst.hasLiked;
          return { ...inst, hasLiked, likes: hasLiked ? inst.likes + 1 : inst.likes - 1 };
        }
        return inst;
      })
    );
  };

  const replyToInstant = (instantId: string, text: string) => {
    const targetInstant = instants.find((i: any) => i.id === instantId);
    if (!targetInstant || !user) return;

    setInstants((prev: any) =>
      prev.map((inst: any) => (inst.id === instantId ? { ...inst, repliesCount: inst.repliesCount + 1 } : inst))
    );

    sendMessage(targetInstant.userId, `📸 Story reply: "${text}"`);
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

    setChats((prev: any) =>
      prev.map((chat: any) => {
        if (chat.id === friendId) {
          return { ...chat, lastMessage: text || "📸 Mídia enviada", lastMessageTime: "Agora", messages: [...chat.messages, newMsg] };
        }
        return chat;
      })
    );
  };

  const sendGameInvite = (friendId: string, gameType: GameInvite["gameType"], gameName: string) => {
    if (!user) return;
    const inviteMsg = {
      id: `msg-game-${Date.now()}`,
      senderId: user.id,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      gameInvite: {
        id: `invite-${Date.now()}`,
        gameType,
        gameName,
        senderName: user.name,
        status: "active" as const,
        myScore: 0,
        friendScore: 0,
      },
    };

    setChats((prev: any) =>
      prev.map((chat: any) => (chat.id === friendId ? { ...chat, lastMessage: `🎮 Convite: ${gameName}`, lastMessageTime: "Agora", messages: [...chat.messages, inviteMsg] } : chat))
    );
  };

  const sendPetInvite = (friendId: string, petName: string, petType: Pet["type"]) => {
    if (!user) return;
    const inviteMsg = {
      id: `msg-pet-${Date.now()}`,
      senderId: user.id,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      petInvite: { petName, petType, status: "pending" as const },
    };

    setChats((prev: any) =>
      prev.map((chat: any) => (chat.id === friendId ? { ...chat, lastMessage: `💌 Convite Tamagotchi Dupla: ${petName}`, lastMessageTime: "Agora", messages: [...chat.messages, inviteMsg] } : chat))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        pet,
        setPet,
        instants,
        chats,
        activeTab,
        setActiveTab,
        addInstant,
        likeInstant,
        replyToInstant,
        sendMessage,
        sendGameInvite,
        sendPetInvite,
        feedPet,
        playPet,
        cleanPet,
        sleepPet,
        updatePetStyle,
        registerAccount,
        loginAccount,
        logout,
        selectedChatId,
        setSelectedChatId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
