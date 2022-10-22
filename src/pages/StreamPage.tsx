import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { createOffer } from "../utils/createOffer";

const width = 640;
const height = 448;

const streamingConstraint: MediaStreamConstraints = {
  video: {
    width: 640,
    height: 448,
    frameRate: 30,
  },
};

export const StreamPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const localStream = useRef<MediaStream | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);

  const receiverId = useStore((store) => store.receiverId);
  const ws = useStore((store) => store.socket);

  useEffect(() => {
    pc.current = new RTCPeerConnection();
    setup();
    return () => {
      console.log("cleanup");
      localStream.current?.getVideoTracks().forEach((track) => track.stop());
    };
  }, []);

  const addStreamToPC = async () => {
    localStream.current = await navigator.mediaDevices.getUserMedia(
      streamingConstraint
    );

    localStream.current.getTracks().forEach((track) => {
      localStream.current && pc.current?.addTrack(track, localStream.current);
    });
  };

  const setup = async () => {
    await addStreamToPC();

    await createOffer({
      pc: pc.current,
      ws,
      receiverId,
      category: "camera",
    });

    ws.on("answer", ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      console.log("answer", answer);
      pc.current?.setRemoteDescription(answer);
    });
    if (videoRef.current) videoRef.current.srcObject = localStream.current;
  };

  return (
    <div className="container flex flex-col items-center">
      <video
        ref={videoRef}
        className={`bg-gray-200 border-4 border-green-500 w-[${width}px] w-[${height}px]`}
        autoPlay
        playsInline
      />
    </div>
  );
};
