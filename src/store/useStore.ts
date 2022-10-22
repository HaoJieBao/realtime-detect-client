import create from "zustand";
import {
  createPeerConnectionSlice,
  PeerConnectionSlice,
} from "./peerConnectionSlice";
import { createSocketSlice, SocketSlice } from "./socketSlice";

export const useStore = create<SocketSlice & PeerConnectionSlice>()((...a) => ({
  ...createSocketSlice(...a),
  ...createPeerConnectionSlice(...a),
}));
