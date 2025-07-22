import React from 'react';
import { Send } from 'lucide-react';
import Button from '../UI/Button';

const MessageInput = ({ 
  value, 
  onChange, 
  onSend, 
  onKeyPress, 
  placeholder = "Type a message..." 
}) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 sm:py-3 bg-slate-600 text-white rounded-lg border border-slate-500 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-sm sm:text-base"
      />
      <Button
        onClick={onSend}
        variant="primary"
        size="sm"
        className="px-3 sm:px-4 py-2 sm:py-3"
      >
        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    </div>
  );
};

export default MessageInput;