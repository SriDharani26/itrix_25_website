"use client";

import { useEffect, useRef, useState } from "react";
import { BsRobot } from "react-icons/bs";
import { User } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const updateOverflow = () => {
      const node = messagesRef.current;
      if (!node) return;
      setIsOverflowing(node.scrollHeight > node.clientHeight);
    };

    updateOverflow();
    window.addEventListener("resize", updateOverflow);
    return () => window.removeEventListener("resize", updateOverflow);
  }, [messages, isTyping]);

  async function sendMessage() {
    if (!input.trim()) return;

    const trimmedInput = input.trim();
    const userMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role: "user",
      content: trimmedInput,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const chatHistory: ChatMessage[] = updatedMessages.map(
        ({ role, content }) => ({
          role,
          content,
        })
      );

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch chatbot response");
      }

      const data = await res.json();
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "Sorry, I could not generate a response right now.";

      setMessages([
        ...updatedMessages,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          role: "assistant",
          content: reply,
          timestamp: Date.now(),
        },
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          role: "assistant",
          content: "Sorry, I could not generate a response right now.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="h-[calc(100%-1rem)] max-[800px]:mb-[-5rem] min-h-0 w-full bg-one flex flex-col overflow-hidden">
      <div className="h-10 sticky top-0 z-30 border-b border-three bg-[--color-two] px-3 sm:px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base text-seven font-semibold tracking-wide">
            iBotrix
          </span>
          <span className="text-xs text-six">Chat</span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-seven">
          {isTyping ? "iBotrix is typing..." : "Ready"}
        </span>
      </div>

      <div
        ref={messagesRef}
        className={`flex-1 min-h-0 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6 ${
          isOverflowing ? "overflow-y-auto" : "overflow-y-hidden"
        }`}
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center px-2">
            <BsRobot size={36} className="mb-3 sm:mb-4 text-seven sm:size-12" />
            <p className="text-xs sm:text-sm text-four/70 px-2">
              Ask{" "}
              <span className="font-medium text-seven">iBotrix</span>{" "}
              to get started...
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
              {msg.role === "assistant" ? (
                <MarkdownPreview
                  source={msg.content}
                  wrapperElement={{ "data-color-mode": "light" }}
                  className="!bg-transparent !text-inherit prose prose-sm max-w-none"
                />
              ) : (
                <p>{msg.content}</p>
              )}
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
              <span className="animate-pulse">Typing...</span>
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



