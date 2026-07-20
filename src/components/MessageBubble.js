export default function MessageBubble({ message }) {
  const isMe = message.sender === 'me';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 sm:max-w-[70%] ${
          isMe
            ? 'rounded-br-sm bg-green-50 text-stone-800'
            : 'rounded-bl-sm bg-white text-stone-800 shadow-sm'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p
          className={`mt-1 text-right text-[10px] ${
            isMe ? 'text-green-600/70' : 'text-stone-400'
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
}
