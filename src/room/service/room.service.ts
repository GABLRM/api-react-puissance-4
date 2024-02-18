import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/service/redis.service';
import { GameService } from '../../game/service/game.service';
import { User, RoomModel, GameStatus } from '../room.model';

@Injectable()
export class RoomService {
  constructor(
    private redisService: RedisService,
    private gameService: GameService,
  ) {}

  async createRoom(user: User, roomId: string): Promise<void> {
    const room: RoomModel = {
      slug: roomId,
      users: [user],
      status: GameStatus.WAITING,
      grid: this.gameService.createStartGrid(),
    };

    const roomKey = `room:${roomId}`;
    await this.redisService.hset(roomKey, [
      'slug',
      room.slug,

      'users',
      JSON.stringify(room.users),

      'status',
      room.status,

      'grid',
      JSON.stringify(room.grid),
    ]);
  }

  async getRoom(roomId: string): Promise<RoomModel> {
    const roomKey: string = `room:${roomId}`;
    if ((await this.redisService.exists(roomKey)) == 0) {
      return null;
    }
    const roomData = await this.redisService.hgetall(roomKey);
    return {
      slug: roomData.slug,
      users: JSON.parse(roomData.users ?? '[]'),
      status: roomData.status,
      grid: JSON.parse(roomData.grid ?? '[][]'),
    } as RoomModel;
  }

  async addUserToRoom(user: User, roomId: string): Promise<void> {
    const room: RoomModel = await this.getRoom(roomId);
    if (room.users.length >= 2) {
      throw new Error(`La room ${roomId} est pleine`);
    }
    const hostColor = room.users[0].color;
    user.color = hostColor === 'red' ? 'yellow' : 'red';
    this.redisService.hset(`room:${roomId}`, ["users", JSON.stringify([...room.users, user])]);
  }
}
