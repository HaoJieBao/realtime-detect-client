import { useEffect, useRef } from "react";
import io from "socket.io-client";

const ws = io("ws://localhost", {
  path: "/ws/socket.io",
  transports: ["websocket", "polling"],
});

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

const pc = new RTCPeerConnection(servers);

function App() {
  const serverId = useRef("");

  useEffect(() => {
    ws.on("receiver", ({ server }: { server: string }) => {
      serverId.current = server;
    });
  }, []);

  const handleSendOfferClicked = async () => {
    // pc.onicecandidate = (event) => {
    //   if (event.candidate) {
    //     console.log("ice candidate:", event.candidate);
    //   }
    // };

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 700, height: 700 },
    });

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // console.log({ offer });

    ws.emit("offer", {
      target: serverId.current,
      offer: { sdp: offer.sdp, type: offer.type },
    });

    ws.on("answer", ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      pc.setRemoteDescription(answer);
      console.log(answer);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <button onClick={handleSendOfferClicked}>Send Offer</button>
    </div>
  );
}

export default App;
