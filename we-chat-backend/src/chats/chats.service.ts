import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable()
export class ChatsService {
  create(createChatDto: CreateChatDto) {}

  findAll(socketRoom: any) {
    const activeRooms = [];
    socketRoom.forEach((room, other) => {
      let isRoom = true;
      room.forEach((id) => {
        if (id === other) {
          isRoom = false;
        } else {
          isRoom = true;
        }
        if (isRoom) activeRooms.push({ name: other });
      });
    });

    const unique = [];
    const distinct = [];
    for (let i = 0; i < activeRooms.length; i++) {
      if (!unique[activeRooms[i].name]) {
        distinct.push(activeRooms[i]);
        unique[activeRooms[i].name] = 1;
      }
    }
    return distinct;
  }

  handleUserTyping(username: string) {
    const existingUser = this.typingUsers.value.find(
      (u) => u.username === username,
    );
    const timeoutId = setTimeout(
      () =>
        this.typingUsers.next(
          this.typingUsers.value.filter((u) => u.username !== username),
        ),
      2000,
    );
    if (!existingUser) {
      this.typingUsers.next([
        ...this.typingUsers.value,
        { username, timeoutId },
      ]);
    } else {
      clearTimeout(existingUser.timeoutId);
      existingUser.timeoutId = timeoutId;
    }
  }

  private typingUsers: BehaviorSubject<{ username: string; timeoutId: any }[]> =
    new BehaviorSubject([]);

  public get typingUsers$(): Observable<string[]> {
    return this.typingUsers.pipe(map((users) => users.map((u) => u.username)));
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
