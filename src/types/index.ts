export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  streak: number; // Foguinho total 🔥
  instantsCount: number;
  handle: string;
}

export interface Reaction {
  id: string;
  emoji: string;
  userName: string;
  userImage: string;
}

export interface InstantReply {
  id: string;
  text: string;
  createdAt: string;
  senderName: string;
  senderImage: string;
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

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'instant';
  timestamp: string;
  isMe: boolean;
}

export interface FriendChat {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  streak: number; // Foguinho diário com essa pessoa 🔥
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}
