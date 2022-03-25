import { defineStore } from "pinia";
import type { Chat } from "@/models/Chat";
import type { Room } from "@/models/Room";
import { ChatService } from "@/services/chat.service";
import type { User } from "@/models/User";

const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chats: [] as Chat[],
    currentRoom: "",
    listOfRooms: [] as Room[],
    listOfUsers: [] as User[],
    isTyping: [] as string[],
    isListening: [] as string[],
  }),
  actions: {
    sendMessage(chat: Chat) {
      chat.room = this.currentRoom;
      chatService.sendMessage(chat);
    },
    getMessages() {
      if (this.isListening.indexOf("getMessages") == -1) {
        chatService.getMessage((data: Chat) => {
          this.chats.push(data);
        });
        this.isListening.push("getMessages");
      }
    },
    isTypingText(chat: Chat) {
      chat.room = this.currentRoom;
      chatService.startTyping(chat);
    },
    updateTyping() {
      if (this.isListening.indexOf("typing") == -1) {
        chatService.updateIsTyping((data: string[]) => {
          this.isTyping = [];
          data.forEach((user) => {
            this.isTyping.push(user);
          });
        });
        this.isListening.push("typing");
      }
    },
    joinChat(nameOfChat: string) {
      this.chats = [];
      const newRoom = { name: nameOfChat } as Room;
      this.currentRoom = nameOfChat;
      chatService.joinRoom(newRoom);
    },
    getAllChats() {
      chatService.getRooms((data: Room[]) => {
        this.listOfRooms = [];
        data.forEach((room) => {
          this.listOfRooms.push(room);
        });
      });
    },
    sendRoomRequest() {
      chatService.sendRoomsEmit();
      this.getAllChats();
    },
  },
});
