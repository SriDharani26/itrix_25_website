"use client";

import { useEffect, useRef, useState } from "react";
import { BsRobot } from "react-icons/bs";
import { User } from "lucide-react";

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
    <div className="h-[calc(100vh-3.5rem)] w-full bg-one flex flex-col">

      {/* ───────── Sticky Header ───────── */}
      <div className="h-10 mt-10 sticky top-10 z-30 border-b border-three bg-[--color-two] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-seven font-semibold tracking-wide">
            iBotrix
          </span>
          <span className="text-xs text-six">Chat</span>
        </div>
        <span className="text-[11px] text-seven">
          {isTyping ? "iBotrix is typing…" : "Ready"}
        </span>
      </div>

      {/* ───────── Messages Area ───────── */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <BsRobot size={48} className="mb-4 text-seven" />
            <p className="text-sm text-four/70">
              Ask{" "}
              <span className="font-medium text-seven">
                iBotrix
              </span>{" "}
              to get started…
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="h-8 w-8 shrink-0 rounded-full bg-six flex items-center justify-center">
                <BsRobot size={18} className="text-black" />
              </div>
            )}

            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 text-sm leading-relaxed shadow-md ${
                msg.role === "user"
                  ? "bg-three text-four"
                  : "bg-two text-four"
              }`}
            >
              <p>{msg.content}</p>
              <p className="mt-1 text-[10px] text-[--color-four]/50 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {msg.role === "user" && (
              <div className="h-8 w-8 shrink-0 rounded-full bg-six flex items-center justify-center">
                <User size={16} className="text-black" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-six flex items-center justify-center">
              <BsRobot size={18} className="text-black" />
            </div>
            <div className="bg-two rounded-lg px-4 py-2 text-sm text-[--color-four]/70">
              <span className="animate-pulse">Typing…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ───────── Input Area ───────── */}
      <div className="border-t border-three px-4 py-3 flex gap-3">
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
          className="flex-1 resize-none rounded-md border border-three  px-4 py-2 text-sm outline-none focus:border-[--color-five] focus:ring-1 focus:ring-[--color-five]/40"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="rounded-md px-5 py-2 text-sm font-medium text-white bg-six hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}