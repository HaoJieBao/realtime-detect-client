import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/useStore";
import { sendOffer } from "../utils/sendOffer";

export const MonitorPage = () => {
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const pc = useRef<RTCPeerConnection | null>(null);

  const receiverId = useStore((store) => store.receiverId);
  const ws = useStore((store) => store.socket);

  useEffect(() => {
    pc.current = new RTCPeerConnection();
    setup();
  }, []);

  const setup = async () => {
    if (!pc.current) return;

    await sendOffer({
      pc: pc.current,
      ws,
      receiverId,
      category: "monitor",
      offerConstraint: { offerToReceiveVideo: true },
    });

    pc.current.ontrack = (event) => {
      console.log("track");
      setStreams((prev) => [...prev, event.streams[0]]);
    };

    ws.on("answer", ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      console.log("answer", answer);
      pc.current?.setRemoteDescription(answer);
    });
  };

  return (
    <div className="grid grid-cols-4">
      {streams.map((stream) => (
        <video
          ref={(video) => {
            if (video) {
              return (video.srcObject = stream);
            }
          }}
          key={stream.id}
          className="bg-gray-200 border-4 border-green-500"
          autoPlay
          playsInline
        />
      ))}
    </div>
  );
};
