import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { createOffer } from "../utils/createOffer";

export const MonitorPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const pc = useStore((store) => store.pcMonitor);
  const receiverId = useStore((store) => store.receiverId);
  const ws = useStore((store) => store.socket);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    await createOffer({ pc, ws, receiverId, category: "monitor" });

    ws.on("answer", ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      pc.setRemoteDescription(answer);
    });

    pc.ontrack = async (event) => {
      console.log("track");
      if (videoRef.current) videoRef.current.srcObject = event.streams[0];
    };
  };

  return (
    <div>
      <video
        ref={videoRef}
        className="bg-gray-200 border-4 border-green-500"
        autoPlay
        playsInline
      />
    </div>
  );
};
