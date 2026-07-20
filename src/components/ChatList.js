'use client';

import { useState, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { messages as mockMessages, chats as mockChats } from '@/lib/pedidos-data';

function ChatListItem({ chat, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(chat.buyerId)}
      className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors ${
        isSelected
          ? 'bg-green-50'
          : 'hover:bg-stone-50'
      }`}
    >
      {/* Buyer photo */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-stone-100">
        {chat.buyerImage ? (
          <img
            src={chat.buyerImage}
            alt={chat.buyerName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-50 text-sm font-bold text-green-700">
            {chat.buyerName.charAt(0)}
          </div>
        )}
        {chat.online && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-semibold text-stone-800">
            {chat.buyerName}
          </span>
          <span className="shrink-0 text-[10px] text-stone-400">{chat.lastTime}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-stone-400">{chat.orderRef}</p>
        <p className="mt-0.5 truncate text-xs text-stone-500">{chat.lastMessage}</p>
      </div>
    </button>
  );
}

export default function ChatList() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({ ...mockMessages });

  const activeChat = mockChats.find((c) => c.buyerId === selectedChat);
  const activeMessages = activeChat ? chatMessages[activeChat.buyerId] || [] : [];

  const handleSend = useCallback(
    (text) => {
      if (!activeChat) return;

      const newMsg = {
        id: Date.now(),
        sender: 'me',
        text,
        time: new Date().toLocaleTimeString('es-PE', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      };

      setChatMessages((prev) => ({
        ...prev,
        [activeChat.buyerId]: [...(prev[activeChat.buyerId] || []), newMsg],
      }));
    },
    [activeChat],
  );

  return (
    <div className="flex h-[600px] overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm sm:h-[550px]">
      {/* Chat list sidebar - hidden on mobile when a chat is selected */}
      <div
        className={`w-full flex-shrink-0 overflow-y-auto border-r border-stone-100 sm:w-72 ${
          selectedChat ? 'hidden sm:block' : 'block'
        }`}
      >
        <div className="border-b border-stone-100 px-5 py-3">
          <h3 className="text-sm font-semibold text-stone-800">Conversaciones</h3>
          <p className="text-xs text-stone-400">{mockChats.length} chats activos</p>
        </div>
        {mockChats.map((chat) => (
          <ChatListItem
            key={chat.buyerId}
            chat={chat}
            isSelected={selectedChat === chat.buyerId}
            onSelect={setSelectedChat}
          />
        ))}
      </div>

      {/* Chat area */}
      <div
        className={`flex flex-1 flex-col ${
          !selectedChat ? 'hidden sm:flex' : 'flex'
        }`}
      >
        {activeChat ? (
          <>
            {/* Mobile back button + header */}
            <div className="flex items-center sm:block">
              <div className="flex items-center sm:hidden">
                <button
                  type="button"
                  onClick={() => setSelectedChat(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-stone-500"
                  aria-label="Volver"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <ChatHeader chat={activeChat} />
              </div>
              <div className="hidden sm:block">
                <ChatHeader chat={activeChat} />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-[#F8F7F4] p-5">
              {activeMessages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </div>

            {/* Input */}
            <ChatInput onSend={handleSend} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-[#F8F7F4]">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-stone-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="mt-3 text-sm font-medium text-stone-500">
                Selecciona un chat
              </p>
              <p className="text-xs text-stone-400">
                Elige una conversación para empezar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
