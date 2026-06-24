export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  streak: number; // Foguinho diário 🔥
  instantsCount: number;
  handle: string;
  password?: string;
  petId?: string;
}

export interface Pet {
  id: string;
  name: string;
  type: 'cat' | 'dog' | 'dragon' | 'fox';
  hunger: number;     // 0 a 100
  happiness: number;  // 0 a 100
  energy: number;     // 0 a 100
  hygiene: number;    // 0 a 100
  level: number;
  xp: number;
  hat: string;        // 'none' | 'crown' | 'wizard' | 'cap'
  glasses: string;    // 'none' | 'cyber' | 'thug' | 'pixel'
  accessory: string;  // 'none' | 'scarf' | 'chain' | 'aura'
  owners: { name: string; avatar: string }[];
  isShared: boolean;
}

export interface Reaction {
  id: string;
  emoji: string;
  userName: string;
  userImage: string;
}

export interface Instant {
  id: string;
  userId: string;
  userName: string;
  userHandle: string;
  userImage: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  createdAt: string;
  timestamp: number;
  likes: number;
  hasLiked?: boolean;
  streakDays: number;
  reactions: Reaction[];
  repliesCount: number;
  location?: string;
}

export interface GameInvite {
  id: string;
  gameType: 'pingpong' | 'soccer' | 'checkers' | 'race' | 'space';
  gameName: string;
  senderName: string;
  status: 'pending' | 'active' | 'finished';
  myScore: number;
  friendScore: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'instant';
  gameInvite?: GameInvite;
  petInvite?: { petName: string; petType: Pet['type']; status: 'pending' | 'accepted' };
  timestamp: string;
  isMe: boolean;
}

export interface FriendChat {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  streak: number; // Ofensiva Foguinho 🔥
  sharedPet?: Pet;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}
