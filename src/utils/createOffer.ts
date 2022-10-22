import { Socket } from "socket.io-client";

export const createOffer = async ({
  pc,
  ws,
  receiverId,
  category,
}: {
  pc: RTCPeerConnection;
  ws: Socket;
  receiverId: string;
  category: "camera" | "monitor";
}) => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  console.log(offer);

  ws.emit("offer", {
    target: receiverId,
    offer: { sdp: offer.sdp, type: offer.type },
    category,
  });
};
