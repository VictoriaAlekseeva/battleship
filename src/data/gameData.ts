import WebSocket from 'ws';

// We should have inmemory DB with player data (login and password) storage

export interface Player {
  name?: string,
  password?: string,
  index?: number,
  ws?: WebSocket,
  // ship?: Ship[],
  wins?: number
}

export const players: Map<string, Player> = new Map();

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

interface GameInfo {
  indexPlayer: number;
  ships: Ship[],
}

export interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
}

export const game: Record<number, GameInfo[]> = {}; //number -> gameId, GameInfo array of 2 items with info about player and its ships
