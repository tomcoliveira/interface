import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export default function InputArea({ onSendMessage, isLoading }: InputAreaProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte qualquer coisa..."
          className="w-full bg-zinc-900/20 text-zinc-100 placeholder-zinc-600 rounded-3xl px-6 py-4 resize-none font-extralight leading-relaxed border-0 focus:ring-2 focus:ring-yellow-600/50 focus:outline-none transition-all duration-500 hover:bg-zinc-900/30 backdrop-blur-sm"
          rows={1}
          disabled={isLoading}
          style={{ minHeight: '40px' }}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading || !input.trim()}
        className="h-10 w-10 flex items-center justify-center border border-yellow-600 bg-transparent hover:bg-yellow-600/10 rounded-xl transition-all duration-300 group backdrop-blur-sm"
      >
        <span className="text-yellow-600 text-sm font-light group-hover:scale-110 transition-transform duration-300">
          {'>_'}
        </span>
      </button>
    </div>
  );
}