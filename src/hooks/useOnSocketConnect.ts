import { useEffect } from "react";
import { Socket } from "socket.io-client";

export const useOnSocketConnect = (
  ws: Socket,
  callback: (response: { server: string }) => void
) => {
  useEffect(() => {
    ws.on("connection", callback);
  }, []);
};
