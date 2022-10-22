import { io, Socket } from "socket.io-client";
import { StateCreator } from "zustand";

export interface SocketSlice {
  socketStream: Socket;
  socketMonitor: Socket;
  receiverId: string;
  setReceiver: (receiverId: string) => void;
}

export const createSocketSlice: StateCreator<
  SocketSlice,
  [],
  [],
  SocketSlice
> = (set) => ({
  socketStream: io("ws://localhost", {
    path: "/ws/socket.io",
    transports: ["websocket", "polling"],
  }),
  socketMonitor: io("ws://localhost", {
    path: "/ws/socket.io",
    transports: ["websocket", "polling"],
  }),
  receiverId: "",
  setReceiver: (receiverId: string) => set({ receiverId }),
});
