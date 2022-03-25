import { io } from "socket.io-client";
import type { Chat } from "@/models/Chat";
import type { Room } from "@/models/Room";

export class ChatService {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }

  getRooms(roomContinue: (room: any) => void) {
    return this.socket.on("getAllRooms", (args) => {
      roomContinue(args);
    });
  }
  sendRoomsEmit() {
    this.socket.emit("getAllRooms");
  }
  createChat(chat: Chat) {
    this.socket.emit("createChat", chat);
  }

  listenToRoom(room: string, chatListener: (chat: Chat) => void) {
    this.socket.on(room, (chat: Chat) => {
      chatListener(chat);
    });
  }

  disconnectFromRoom(room: string) {
    this.socket.off(room);
  }

  joinRoom(nameOfChat: Room) {
    this.socket.emit("createRoom", nameOfChat);
  }

  sendMessage(chat: Chat) {
    this.socket.emit("sendMessage", chat);
  }

  getMessage(chatContinue: (chat: any) => void) {
    return this.socket.on("getMessage", (args) => {
      chatContinue(args);
    });
  }

  startTyping(chat: Chat) {
    this.socket.emit("isTyping", chat);
  }

  updateIsTyping(chatContinue: (chat: any) => void) {
    return this.socket.on("getIsTyping", (args) => {
      console.log(args);
      chatContinue(args);
    });
  }
}
