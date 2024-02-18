export interface RoomModel {
  slug: string;
  users: User[];
  status: GameStatus;
  grid: string[][];
}

export interface User {
  username: string;
  color: string;
  socketId: string;
  hasToPlay: boolean;
  isHost: boolean;
}

export enum GameStatus {
  WAITING = 'waiting',
  PLAYING = 'playing',
  FINISHED = 'finished',
}
