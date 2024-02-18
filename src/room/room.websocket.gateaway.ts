import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Subscriber } from 'rxjs';
import { Socket } from 'socket.io';
import { RedisService } from 'src/redis/service/redis.service';
import { RoomModel } from './room.model';
import { RoomService } from '../room/service/room.service';

interface Message {
  timeSent: string;
  text: string;
}

interface User {
  username: string;
  color?: string;
  isHost?: boolean;
}

@WebSocketGateway({ cors: '*', namespace: 'room' })
export class RoomWebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly redisService: RedisService,
    private readonly roomService: RoomService,
    //private readonly gameService: GameService,
  ) {}

  @WebSocketServer() server;

  handleConnection(socket: Socket): void {
    const socketId = socket.id;
    const UserData = socket.handshake.query.user as unknown as User;
    socket.data.user = {
      socketId: socketId,
      username: UserData.username,
      color: UserData?.color,
      isHost: UserData?.isHost,
      hasToPlay: false,
    };
    socket.data.slug = socket.handshake.query.slug as string;
    console.log(`New connecting... socket id:`, socketId);
  }

  handleDisconnect(socket: Socket): void {
    // gerer le cas si disconnect pendant une partie
    console.log(`Disconnecting... socket id:`, socket.id);
  }

  //@SubscribeMessage('createRoom')

  @SubscribeMessage('joinRoom')
  async joinRoom(@ConnectedSocket() client: Socket): Promise<{}> {
    const room = await this.roomService.getRoom(client.data.slug);
    if (room) {
      try {
        this.roomService.addUserToRoom(client.data.user, client.data.slug);

        // TODO : if room = en cours alors renvoyer info grid
      } catch (error) {
        return { error: error.message };
      }
    } else {
      this.roomService.createRoom(client.data.user, client.data.slug);
    }
    client.join(client.data.slug);
    return { message: 'ok' };
  }

  // TODO : event play

  // TODO :  recevoir un index = column joué

  // TODO : appeler fonction GameService

  // TODO : appeler des évenements en fonction du résultat du gameService
}
