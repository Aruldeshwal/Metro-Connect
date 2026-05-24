"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useIcebreakers } from "@/hooks/useIcebreakers";
import { useSmartReplies } from "@/hooks/useSmartReplies";
import {
  FiSend,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiSmile,
  FiPaperclip,
  FiZap,
  FiRefreshCw,
  FiMessageCircle,
} from "react-icons/fi";

const initialMessages = [
  {
    id: 1,
    sender: "other",
    text: "Hey, are you boarding from Rajiv Chowk today?",
    time: "09:12 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Yeah. Blue line around 10 AM.",
    time: "09:13 AM",
  },
  {
    id: 3,
    sender: "other",
    text: "Perfect. We probably have the same route.",
    time: "09:14 AM",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  
  // Placeholder IDs for demo purposes
  const chatContext = {
    currentUserId: "user_123",
    targetUserId: "user_456",
    conversationId: "conv_789",
    matchId: "match_000",
  };

  const { suggestions: icebreakers, isLoading: isIcebreakersLoading, fetchIcebreakers } = useIcebreakers(chatContext);
  const { replies: smartReplies, isLoading: isSmartRepliesLoading, fetchSmartReplies } = useSmartReplies(chatContext);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
    
    // Auto-fetch smart replies if last message is from other
    if (messages.length > 0 && messages[messages.length - 1].sender === "other") {
      fetchSmartReplies();
    }
  }, [messages, fetchSmartReplies]);

  const sendMessage = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    if (!textToSend) setInput("");

    // Fake realtime reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "other",
          text: "Sounds good.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1200);
  };

  const allSuggestions = [...icebreakers, ...smartReplies];
  const isAnyLoading = isIcebreakersLoading || isSmartRepliesLoading;

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* SIDEBAR */}
      <div className="hidden md:flex w-90 border-r border-white/10 bg-zinc-950 flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">
            Messages
          </h1>

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full mt-5 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3, 4].map((chat) => (
            <div
              key={chat}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 cursor-pointer border-b border-white/5 transition"
            >
              <Image
                src={`https://placehold.co/100x100/7c3aed/ffffff?text=U${chat}`}
                alt="user"
                width={52}
                height={52}
                className="rounded-full"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    Sophia Carter
                  </h3>

                  <span className="text-xs text-zinc-500">
                    2m
                  </span>
                </div>

                <p className="text-sm text-zinc-400 truncate">
                  See you at the station.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-linear-to-b from-zinc-950 to-black">
        {/* TOP BAR */}
        <div className="h-24 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-xl bg-black/40">
          <div className="flex items-center gap-4">
            <Image
              src="https://placehold.co/100x100/7c3aed/ffffff?text=SC"
              alt="profile"
              width={56}
              height={56}
              className="rounded-full"
            />

            <div>
              <h2 className="font-semibold text-lg">
                Sophia Carter
              </h2>

              <p className="text-sm text-emerald-400">
                Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
              <FiPhone />
            </button>

            <button className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
              <FiVideo />
            </button>

            <button className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
              <FiMoreVertical />
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-3xl px-5 py-4 border ${
                  message.sender === "me"
                    ? "bg-violet-600 border-violet-500"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <p className="text-[15px] leading-relaxed">
                  {message.text}
                </p>

                <div
                  className={`text-xs mt-2 ${
                    message.sender === "me"
                      ? "text-violet-200"
                      : "text-zinc-500"
                  }`}
                >
                  {message.time}
                </div>
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* AI SUGGESTIONS (Icebreakers & Smart Replies) */}
        {allSuggestions.length > 0 && !isAnyLoading && (
          <div className="px-6 py-3 flex gap-3 overflow-x-auto no-scrollbar bg-black/20 backdrop-blur-sm border-t border-white/5">
            {allSuggestions.map((suggestion, index) => {
              const isSmartReply = smartReplies.includes(suggestion);
              return (
                <button
                  key={index}
                  onClick={() => sendMessage(suggestion)}
                  className={`whitespace-nowrap border px-4 py-2 rounded-full text-sm transition-all duration-200 flex items-center gap-2 group ${
                    isSmartReply 
                      ? "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-200"
                      : "bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/20 text-violet-200"
                  }`}
                >
                  {isSmartReply ? (
                    <FiMessageCircle className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  ) : (
                    <FiZap className="text-violet-400 group-hover:scale-110 transition-transform" />
                  )}
                  {suggestion}
                </button>
              );
            })}
            <button 
              onClick={() => {
                if (smartReplies.length > 0) fetchSmartReplies();
                else fetchIcebreakers();
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 transition-colors"
              title="Regenerate suggestions"
            >
              <FiRefreshCw size={14} className={isAnyLoading ? "animate-spin" : ""} />
            </button>
          </div>
        )}

        {isAnyLoading && (
          <div className="px-6 py-3 flex gap-3 bg-black/20 backdrop-blur-sm border-t border-white/5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-9 w-32 animate-pulse bg-white/5 rounded-full border border-white/10" />
            ))}
          </div>
        )}

        {/* INPUT */}
        <div className="p-5 border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-3xl px-5 py-3">
            <button 
              onClick={fetchIcebreakers}
              disabled={isAnyLoading}
              className={`text-violet-400 hover:text-violet-300 transition-all duration-200 ${isAnyLoading ? 'animate-spin' : 'hover:scale-110'}`}
              title="Get AI Icebreakers"
            >
              <FiZap size={22} fill={icebreakers.length > 0 ? "currentColor" : "none"} />
            </button>

            <button className="text-zinc-400 hover:text-white transition">
              <FiSmile size={22} />
            </button>

            <button className="text-zinc-400 hover:text-white transition">
              <FiPaperclip size={22} />
            </button>

            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
            />

            <button
              onClick={() => sendMessage()}
              className="h-12 w-12 rounded-full bg-violet-600 hover:bg-violet-700 flex items-center justify-center transition shadow-lg shadow-violet-600/20"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}