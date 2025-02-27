import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (message: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if(message === "") {
      return;
    }
    const socketInstance = io("http://localhost:5000");

    socketInstance.on("connect", () => console.log("Connected to WebSocket"));

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [message]);

  return socket;
};
