export default function ChatHeader({ chat }) {
  return (
    <div className="flex items-center gap-3 border-b border-stone-100 bg-white px-5 py-4">
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
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold text-stone-800">
            {chat.buyerName}
          </h3>
          {chat.online && (
            <span className="text-xs text-green-600">En línea</span>
          )}
        </div>
        <p className="truncate text-xs text-stone-400">{chat.orderRef}</p>
      </div>
    </div>
  );
}
