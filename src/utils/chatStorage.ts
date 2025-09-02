export interface ChatMessage {
  id: string;
  userType: 'student' | 'subject-teacher' | 'class-teacher' | 'admin';
  userName: string;
  userInfo?: string; // subject, class, or department
  time: string;
  model: string;
  prompt: string;
  aiResponse: string;
}

export interface ChatStorage {
  saveChat: (message: ChatMessage) => void;
  getChatsByUserType: (userType: ChatMessage['userType']) => ChatMessage[];
  getTodayChatsByUserType: (userType: ChatMessage['userType']) => ChatMessage[];
  clearOldChats: () => void;
}

class LocalChatStorage implements ChatStorage {
  private readonly STORAGE_KEY = 'ai-chat-history';
  private readonly MAX_DAYS = 7; // Keep chats for 7 days

  private getStorageKey(): string {
    return this.STORAGE_KEY;
  }

  private getChats(): ChatMessage[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading chat storage:', error);
      return [];
    }
  }

  private saveChats(chats: ChatMessage[]): void {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chat storage:', error);
    }
  }

  saveChat(message: ChatMessage): void {
    const chats = this.getChats();
    chats.unshift(message); // Add new chat at the beginning
    
    // Keep only recent chats (last 1000 messages)
    if (chats.length > 1000) {
      chats.splice(1000);
    }
    
    this.saveChats(chats);
  }

  getChatsByUserType(userType: ChatMessage['userType']): ChatMessage[] {
    const chats = this.getChats();
    return chats.filter(chat => chat.userType === userType);
  }

  getTodayChatsByUserType(userType: ChatMessage['userType']): ChatMessage[] {
    const today = new Date();
    const todayString = today.toDateString();
    
    const chats = this.getChatsByUserType(userType);
    return chats.filter(chat => {
      const chatDate = new Date(chat.time);
      return chatDate.toDateString() === todayString;
    });
  }

  clearOldChats(): void {
    const chats = this.getChats();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.MAX_DAYS);
    
    const recentChats = chats.filter(chat => {
      const chatDate = new Date(chat.time);
      return chatDate >= cutoffDate;
    });
    
    this.saveChats(recentChats);
  }
}

// Create and export a singleton instance
export const chatStorage = new LocalChatStorage();

// Clean up old chats every day
if (typeof window !== 'undefined') {
  const lastCleanup = localStorage.getItem('ai-chat-last-cleanup');
  const today = new Date().toDateString();
  
  if (lastCleanup !== today) {
    chatStorage.clearOldChats();
    localStorage.setItem('ai-chat-last-cleanup', today);
  }
}
