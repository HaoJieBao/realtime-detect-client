import { io, Socket } from "socket.io-client";
import { StateCreator } from "zustand";

export interface SocketSlice {
  socket: Socket;
  receiverId: string;
  setReceiver: (receiverId: string) => void;
}

export const createSocketSlice: StateCreator<
  SocketSlice,
  [],
  [],
  SocketSlice
> = (set) => ({
  socket: io("ws://localhost:8081", {
    path: "/ws/socket.io",
    transports: ["websocket", "polling"],
  }),
  receiverId: "",
  setReceiver: (receiverId: string) => set({ receiverId }),
});
