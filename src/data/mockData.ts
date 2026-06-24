import { Instant, FriendChat, User, Pet } from '@/types';

export const CURRENT_USER_MOCK: User = {
  id: 'user-me-123',
  name: 'Alex Cyber',
  handle: '@alex.instants',
  email: 'alex@cyber.io',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  streak: 28,
  instantsCount: 142,
  petId: 'pet-my-1',
};

export const INITIAL_MY_PET: Pet = {
  id: 'pet-my-1',
  name: 'Byte',
  type: 'dragon',
  hunger: 75,
  happiness: 85,
  energy: 90,
  hygiene: 65,
  level: 5,
  xp: 340,
  hat: 'crown',
  glasses: 'cyber',
  accessory: 'chain',
  owners: [
    { name: 'Alex Cyber', avatar: CURRENT_USER_MOCK.image },
    { name: 'Sofia Neon', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' }
  ],
  isShared: true,
};

export const INITIAL_INSTANTS: Instant[] = [
  {
    id: 'inst-1',
    userId: 'friend-1',
    userName: 'Sofia Neon',
    userHandle: '@sofia.vibe',
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Alimentando nosso pet Byte depois da chuva em Tóquio 🐉⚡️',
    createdAt: 'há 12 min',
    timestamp: Date.now() - 12 * 60 * 1000,
    likes: 24,
    hasLiked: false,
    streakDays: 19,
    location: 'Tóquio, JP',
    repliesCount: 3,
    reactions: [
      { id: 'r1', emoji: '🔥', userName: 'Lucas', userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' },
      { id: 'r2', emoji: '⚡️', userName: 'Bia', userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'inst-2',
    userId: 'friend-2',
    userName: 'Lucas Shader',
    userHandle: '@lucas.glsl',
    userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Ganhei de 5x3 na Guerra Espacial pelo chat do Instants 🚀🎮',
    createdAt: 'há 45 min',
    timestamp: Date.now() - 45 * 60 * 1000,
    likes: 42,
    hasLiked: true,
    streakDays: 34,
    location: 'Lisboa, PT',
    repliesCount: 7,
    reactions: [
      { id: 'r4', emoji: '🚀', userName: 'Alex', userImage: CURRENT_USER_MOCK.image }
    ]
  }
];

export const INITIAL_FRIENDS_CHATS: FriendChat[] = [
  {
    id: 'friend-1',
    name: 'Sofia Neon',
    handle: '@sofia.vibe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    streak: 19,
    sharedPet: INITIAL_MY_PET,
    lastMessage: 'Partilha uma foto pro Byte ganhar comida! 🍎',
    lastMessageTime: '12:42',
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: 'm1', senderId: 'friend-1', text: 'Hey Alex! O Byte está com 75% de fome.', timestamp: '11:20', isMe: false },
      { id: 'm2', senderId: 'user-me-123', text: 'Já vou dar uma maçã cibernética pra ele!!', timestamp: '11:22', isMe: true },
      { 
        id: 'm3', 
        senderId: 'friend-1', 
        timestamp: '12:40', 
        isMe: false,
        gameInvite: {
          id: 'g-invite-1',
          gameType: 'space',
          gameName: 'Guerra Espacial 🚀👾',
          senderName: 'Sofia Neon',
          status: 'pending',
          myScore: 0,
          friendScore: 0
        }
      },
      { id: 'm4', senderId: 'friend-1', text: 'Partilha uma foto pro Byte ganhar comida! 🍎', timestamp: '12:42', isMe: false }
    ]
  },
  {
    id: 'friend-2',
    name: 'Lucas Shader',
    handle: '@lucas.glsl',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    streak: 34,
    lastMessage: 'Bora uma partida de Ping Pong? 🏓',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: 'm5', senderId: 'friend-2', text: 'E aí mano, batemos 34 dias de foguinho 🔥🔥', timestamp: 'Ontem', isMe: false },
      { id: 'm6', senderId: 'friend-2', text: 'Bora uma partida de Ping Pong? 🏓', timestamp: 'Ontem', isMe: false }
    ]
  }
];
