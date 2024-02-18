import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/service/redis.service';

@Injectable()
export class GameService {
  constructor(private redisService: RedisService) {}

  createStartGrid() {
    const grid = Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => ''));
    return grid;
  }

// TODO : bouger les fonctions jeu ici


// TODO : Bien modifier la grille a chaque tour dans le redis


// TODO : Modifier le user.hasToPlay à chaque tour


}
