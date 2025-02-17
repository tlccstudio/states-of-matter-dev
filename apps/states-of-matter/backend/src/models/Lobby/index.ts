import type {Document} from "mongodb";

interface LobbyPlayer {
  name: string;
  socketId: string;
  avatarId: number;
}

interface Lobby extends Document {
  lobbyId: number;
  host: LobbyPlayer;
  challengee: LobbyPlayer;
}

export type {Lobby, LobbyPlayer};
