import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';
import { User } from '../core/user.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatsGateway {
  @WebSocketServer()
  server: Server;
  doOnce = false;
  constructor(private readonly chatsService: ChatsService) {
    this.chatsService.typingUsers$.subscribe((data) => {
      if (this.doOnce) this.server.emit('getIsTyping', data);
      else this.doOnce = true;
    });
  }

  @SubscribeMessage('createRoom')
  async create(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
    socket.join(room.name);
    this.server.emit(
      'getAllRooms',
      this.chatsService.findAll(this.server.sockets.adapter.rooms),
    );
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.to(message.room).emit('getMessage', {
      user: message.user,
      text: message.text,
    });
  }

  @SubscribeMessage('getAllRooms')
  async findAll(@ConnectedSocket() socket: Socket) {
    socket.emit(
      'getAllRooms',
      this.chatsService.findAll(this.server.sockets.adapter.rooms),
    );
    return this.chatsService.findAll(this.server.sockets.adapter.rooms);
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatsService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatsService.remove(id);
  }

  @SubscribeMessage('sendMessage')
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    client.emit(
      'getAllRooms',
      this.chatsService.findAll(this.server.sockets.adapter.rooms),
    );
  }

  @SubscribeMessage('isTyping')
  async onTypingStart(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ) {
    this.chatsService.handleUserTyping(message.user);
  }
}
