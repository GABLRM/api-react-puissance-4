import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { RoomWebsocketGateway } from './room/room.websocket.gateaway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoomWebsocketGateway],
})
export class AppModule {}
