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
    <div className="h-full w-full bg-one flex flex-col">

      <div className="h-10 mt-10 sticky top-10 z-30 border-b border-three bg-[--color-two] px-3 sm:px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base text-seven font-semibold tracking-wide">
            iBotrix
          </span>
          <span className="text-xs text-six">Chat</span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-seven">
          {isTyping ? "iBotrix is typing…" : "Ready"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center px-2">
            <BsRobot size={36} className="mb-3 sm:mb-4 text-seven sm:size-12" />
            <p className="text-xs sm:text-sm text-four/70 px-2">
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
            className={`flex gap-2 sm:gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full bg-six flex items-center justify-center">
                <BsRobot size={14} className="text-black sm:size-[18px]" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[70%] md:max-w-[60%] rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm leading-relaxed shadow-md ${
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
              <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full bg-six flex items-center justify-center">
                <User size={14} className="text-black sm:size-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-six flex items-center justify-center">
              <BsRobot size={14} className="text-black sm:size-[18px]" />
            </div>
            <div className="bg-two rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-[--color-four]/70">
              <span className="animate-pulse">Typing…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-three px-3 sm:px-4 py-2 sm:py-3 flex gap-2 sm:gap-3">
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
          className="flex-1 resize-none rounded-md border border-three px-3 sm:px-4 py-1.5 text-xs sm:text-sm outline-none focus:border-[--color-five] focus:ring-1 focus:ring-[--color-five]/40"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="rounded-md px-3 sm:px-5 py-1.5 text-xs sm:text-sm font-medium text-white bg-six hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition whitespace-nowrap"
        >
          Send
        </button>
      </div>
    </div>
  );
}