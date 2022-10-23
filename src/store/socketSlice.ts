import { io, Socket } from "socket.io-client";
import { StateCreator } from "zustand";

export interface SocketSlice {
  socket: Socket;
  receiverId: string;
  setReceiver: (receiverId: string) => void;
}

const WS_HOST =
  import.meta.env.VITE_WS_HOST || "wss://hao-jie-bao.herokuapp.com";
const WS_PORT = import.meta.env.VITE_WS_PORT || 443;

export const createSocketSlice: StateCreator<
  SocketSlice,
  [],
  [],
  SocketSlice
> = (set) => ({
  socket: io("wss://hao-jie-bao.herokuapp.com", {
    path: "/ws/socket.io",
    transports: ["websocket", "polling"],
  }),
  receiverId: "",
  setReceiver: (receiverId: string) => set({ receiverId }),
});
