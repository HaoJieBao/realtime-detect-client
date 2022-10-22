import { io, Socket } from "socket.io-client";
import { StateCreator } from "zustand";

export interface SocketSlice {
  socket: Socket;
  receiverId: string;
  setReceiver: (receiverId: string) => void;
}

const WS_HOST = import.meta.env.VITE_WS_HOST || "localhost";
const WS_PORT = import.meta.env.VITE_WS_PORT || 8080;

export const createSocketSlice: StateCreator<
  SocketSlice,
  [],
  [],
  SocketSlice
> = (set) => ({
  socket: io(`ws://${WS_HOST}:${WS_PORT}`, {
    path: "/ws/socket.io",
    transports: ["websocket", "polling"],
  }),
  receiverId: "",
  setReceiver: (receiverId: string) => set({ receiverId }),
});
