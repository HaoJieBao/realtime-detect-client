import { StateCreator } from "zustand";

const servers: RTCConfiguration = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ],
    },
  ],
};

export interface PeerConnectionSlice {
  pcStream: RTCPeerConnection;
  pcMonitor: RTCPeerConnection;
}

export const createPeerConnectionSlice: StateCreator<
  PeerConnectionSlice,
  [],
  [],
  PeerConnectionSlice
> = (set) => ({
  pcStream: new RTCPeerConnection(servers),
  pcMonitor: new RTCPeerConnection(servers),
});
