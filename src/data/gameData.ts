import WebSocket from 'ws';

// We should have inmemory DB with player data (login and password) storage

export interface Player {
  name: string,
  password: string,
  index: number,
  ws: WebSocket,
  room?: number | null,
  gameId?: number | null
  // ships?: Ships[],
  wins?: number
}

export const players: Map<string, Player> = new Map();

export const playersID: Record<number, string> = {}; // list players name -> id

//Player room data (players, game board, ships positions) storages in the server
export const rooms: Room[] = [];

export interface Room {
  roomId: number;
  roomUsers: RoomUsers[];
}

export interface RoomUsers {
  name: string;
  index: number;
}

export interface GameInfo {
  players: number[];
  ships: Ships[][]
  currentPlayer: number; // index of current player in players array
}

export interface Ships {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
  // shotsCounter?: number;
  shotsCoordinates?: {
    x: number;
    y: number;
  }[];
  status?: "killed"|"shot"
}

export const game: Record<number | string, GameInfo> = {}; //number -> gameId, GameInfo array of 2 items with info about players

// game = {gameId:[{indexPlayer: number}], currentPlayer: index}}