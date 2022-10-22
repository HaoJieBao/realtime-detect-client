import { Socket } from "socket.io-client";

export const sendOffer = async ({
  pc,
  ws,
  receiverId,
  category,
  offerConstraint,
}: {
  pc: RTCPeerConnection | null;
  ws: Socket;
  receiverId: string;
  category: "camera" | "monitor";
  offerConstraint?: RTCOfferOptions;
}) => {
  if (!pc) {
    console.log("pc is null");
    return;
  }

  const offer = await pc.createOffer(offerConstraint);
  await pc.setLocalDescription(offer);

  console.log("offer", offer);

  pc.onicecandidate = (event) => {
    if (event.candidate !== null) {
      console.log("new ice");
    } else {
      // no more ice candidate
      ws.emit("offer", {
        target: receiverId,
        offer: pc.localDescription,
        category,
      });
    }
  };
};
