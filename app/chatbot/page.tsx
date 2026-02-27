"use client";

import { useEffect, useRef, useState } from "react";
import { BsRobot } from "react-icons/bs";
import {User} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "iBotrix response placeholder...",
          timestamp: Date.now(),
        },
      ]);
      setIsTyping(false);
    }, 900);
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] md:h-full w-full bg-[#1e1e1e] text-gray-100 flex flex-col">
        <div className="h-10 border-b border-gray-700 px-4 flex items-center justify-between bg-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-semibold">iBotrix</span>
          <span className="text-xs text-gray-400">Chat</span>
        </div>
        <span className="text-[11px] bg-[#1e1e1e] text-gray-400">
          {isTyping ? "iBotrix is typing…" : "Ready"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
                <BsRobot size={48} className="mb-4 text-cyan-600" />
                <p className="text-sm text-gray-400">
                Ask <span className="font-medium text-cyan-400">iBotrix</span> to get started…
                </p>
            </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="h-8 w-8 rounded-full bg-cyan-600 flex items-center justify-center text-xs font-bold">
                <BsRobot size={20}/>
              </div>
            )}

            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 text-sm leading-relaxed shadow-sm animate-fadeIn ${
                msg.role === "user"
                  ? "bg-[#252526] text-white"
                  : "bg-[#252526] text-gray-200"
              }`}
            >
              <p>{msg.content}</p>
              <p className="mt-1 text-[10px] text-gray-400 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {msg.role === "user" && (
              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold">
                <User size={20}/>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-cyan-600 flex items-center justify-center text-xs">
              <BsRobot size={20}/>
            </div>
            <div className="bg-[#252526] rounded-lg px-4 py-2 text-sm text-gray-300">
              <span className="animate-pulse">Typing…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-700 bg-[#1f1f1f] px-4 py-3 flex gap-3">
        <textarea
          value={input}
          rows={1}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask iBotrix..."
          className="flex-1 resize-none rounded-md border border-gray-600 bg-[#252526] px-4 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="rounded-md px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}