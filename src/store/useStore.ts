import create from "zustand";

import { createSocketSlice, SocketSlice } from "./socketSlice";

export const useStore = create<SocketSlice>()((...a) => ({
  ...createSocketSlice(...a),
}));
