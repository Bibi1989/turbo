"use client";

import { useState } from "react";

import { useSocket } from "@/hooks/socket-io";

// const getUserStorage = localStorage.getItem("user") as string;

// const id1 = "98394d5e-e439-4cc5-bb1c-cb485a333c47"
const id2 = "ed6f1b5e-c0eb-48b7-9bba-0ba2f75b9a7c"

export default function Chat() {
//   const userId = JSON.parse(getUserStorage)?.id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { message: string; userId: string }[]
  >([]);

  const socket = useSocket(message);

  socket?.off(id2).on(id2, (msg: { message: string; userId: string }) => {
    console.log(msg);
    setMessages((prev) => [...prev, msg]);
  });

  const sendMessage = () => {
    if (socket && message) {
      socket.emit("createChat", {
        userId: id2,
        message: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2>Event Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index} className="text-sm">
            {msg?.message}
          </p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 border-black rounded-md p-2"
      />
      <button
        onClick={sendMessage}
        className="bg-black text-white rounded-md p-2"
      >
        Send
      </button>
    </div>
  );
}
