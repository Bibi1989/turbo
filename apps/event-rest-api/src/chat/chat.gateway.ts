import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Request } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    transports: ['websocket'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected', client.id);
    client.emit('user-joined', {
      message: 'User joined',
      clientId: client.id,
    });
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected', client.id);
    client.emit('user-left', {
      message: 'User left',
      clientId: client.id,
    });
  }

  @SubscribeMessage('createChat')
  create(client: Socket, createChatDto: CreateChatDto) {
    client.emit(createChatDto.userId, createChatDto);
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
