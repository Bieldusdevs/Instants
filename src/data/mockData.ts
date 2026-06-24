import { Instant, FriendChat, User } from '@/types';

export const CURRENT_USER_MOCK: User = {
  id: 'user-me-123',
  name: 'Alex Cyber',
  handle: '@alex.instants',
  email: 'alex@cyber.io',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  streak: 28, // Foguinho global 🔥
  instantsCount: 142,
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
    caption: 'Vibe cyberpunk na chuva de Tóquio ⚡️☕️',
    createdAt: 'há 12 min',
    timestamp: Date.now() - 12 * 60 * 1000,
    likes: 24,
    hasLiked: false,
    streakDays: 19,
    location: 'Tóquio, JP',
    repliesCount: 3,
    reactions: [
      { id: 'r1', emoji: '🔥', userName: 'Lucas', userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' },
      { id: 'r2', emoji: '⚡️', userName: 'Bia', userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      { id: 'r3', emoji: '💜', userName: 'Kaio', userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
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
    caption: 'Renderizando shaders 3D em tempo real 🚀💻',
    createdAt: 'há 45 min',
    timestamp: Date.now() - 45 * 60 * 1000,
    likes: 42,
    hasLiked: true,
    streakDays: 34,
    location: 'Lisboa, PT',
    repliesCount: 7,
    reactions: [
      { id: 'r4', emoji: '🚀', userName: 'Alex', userImage: CURRENT_USER_MOCK.image },
      { id: 'r5', emoji: '🔥', userName: 'Sofia', userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'inst-3',
    userId: 'friend-3',
    userName: 'Bia Cyber',
    userHandle: '@bia.3d',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Arte generativa e café da tarde ✨☕️',
    createdAt: 'há 2 horas',
    timestamp: Date.now() - 120 * 60 * 1000,
    likes: 89,
    hasLiked: false,
    streakDays: 12,
    location: 'São Paulo, BR',
    repliesCount: 12,
    reactions: [
      { id: 'r6', emoji: '✨', userName: 'Diego', userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'inst-4',
    userId: 'friend-4',
    userName: 'Diego GPU',
    userHandle: '@diego.webgpu',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Testando a nova câmera do Instants! Rapidez absurda ⚡️',
    createdAt: 'há 3 horas',
    timestamp: Date.now() - 180 * 60 * 1000,
    likes: 15,
    hasLiked: false,
    streakDays: 45,
    location: 'Berlim, DE',
    repliesCount: 1,
    reactions: [
      { id: 'r7', emoji: '🔥', userName: 'Lucas', userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' }
    ]
  }
];

export const INITIAL_FRIENDS_CHATS: FriendChat[] = [
  {
    id: 'friend-1',
    name: 'Sofia Neon',
    handle: '@sofia.vibe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    streak: 19, // TikTok Fire Streak 🔥
    lastMessage: 'Amei aquele seu instant de hoje! ⚡️',
    lastMessageTime: '12:42',
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: 'm1', senderId: 'friend-1', text: 'Hey Alex! Viu o novo shader que saiu?', timestamp: '11:20', isMe: false },
      { id: 'm2', senderId: 'user-me-123', text: 'Vi sim!! Ficou surreal, vou implementar no Instants agora.', timestamp: '11:22', isMe: true },
      { id: 'm3', senderId: 'friend-1', text: 'Amei aquele seu instant de hoje! ⚡️', timestamp: '12:42', isMe: false },
    ]
  },
  {
    id: 'friend-2',
    name: 'Lucas Shader',
    handle: '@lucas.glsl',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    streak: 34, // Super Ofensiva 🔥
    lastMessage: 'Partilha a foto comigo pro story!',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: 'm4', senderId: 'friend-2', text: 'E aí mano, batemos 34 dias de foguinho 🔥🔥', timestamp: 'Ontem', isMe: false },
      { id: 'm5', senderId: 'user-me-123', text: 'Bora rumo aos 100 dias!! Nunca deixo apagar.', timestamp: 'Ontem', isMe: true },
      { id: 'm6', senderId: 'friend-2', text: 'Partilha a foto comigo pro story!', timestamp: 'Ontem', isMe: false },
    ]
  },
  {
    id: 'friend-3',
    name: 'Bia Cyber',
    handle: '@bia.3d',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    streak: 12,
    lastMessage: 'Você mandou um instant 📸',
    lastMessageTime: 'Segunda',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm7', senderId: 'user-me-123', text: 'Olha essa vista aqui do escritório', timestamp: 'Segunda', isMe: true },
      { id: 'm8', senderId: 'friend-3', text: 'Que lindo!! Manda no Feed principal tbm', timestamp: 'Segunda', isMe: false },
    ]
  },
  {
    id: 'friend-4',
    name: 'Diego GPU',
    handle: '@diego.webgpu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    streak: 45, // Maior streak do app 🔥
    lastMessage: 'Foguinho mantido! 🔥',
    lastMessageTime: 'Domingo',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm9', senderId: 'friend-4', text: 'Foguinho mantido! 🔥', timestamp: 'Domingo', isMe: false }
    ]
  }
];
