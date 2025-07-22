import React from 'react';

const MessageBubble = ({ message }) => {
  const { user, message: text, timestamp, isOwn, isSystem } = message;

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-yellow-500/20 text-yellow-200 text-center text-sm px-4 py-2 rounded-full max-w-[90%]">
          {text}
          <div className="text-xs opacity-60 mt-1">{timestamp}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-lg transform transition-all duration-200 hover:scale-[1.02] ${
          isOwn
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-sm'
            : 'bg-slate-700 text-gray-200 rounded-bl-sm'
        }`}
      >
        {!isOwn && (
          <div className="text-xs opacity-70 mb-1 font-medium">{user}</div>
        )}
        <div className="text-sm leading-relaxed break-words">{text}</div>
        <div className="text-xs opacity-60 mt-1 text-right">{timestamp}</div>
      </div>
    </div>
  );
};

export default MessageBubble;