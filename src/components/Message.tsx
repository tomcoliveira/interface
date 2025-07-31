import React from 'react';
import { Copy } from 'lucide-react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
  isDarkMode?: boolean;
}

export default function Message({ message, isDarkMode = true }: MessageProps) {
  const isUser = message.type === 'user';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  const bgClass = isDarkMode 
    ? (isUser ? 'bg-zinc-900/60' : 'bg-zinc-900/40')
    : (isUser ? 'bg-gray-200' : 'bg-gray-100');
  
  const textClass = isDarkMode ? 'text-zinc-100' : 'text-gray-900';
  const mutedTextClass = isDarkMode ? 'text-zinc-400' : 'text-gray-600';
  
  return (
    <div className={`group flex ${isUser ? 'justify-end' : 'justify-start'} mb-8 opacity-0 animate-fadeIn`}>
      <div className={`relative max-w-2xl ${bgClass} rounded-3xl px-6 py-5 transition-all duration-500 hover:bg-opacity-70 backdrop-blur-sm`}>
        {/* Botão copiar */}
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`}
        >
          <Copy className={`w-3 h-3 ${mutedTextClass}`} />
        </button>
        
        {!isUser && (
          <div className="text-xs text-yellow-600 mb-3 font-light tracking-wider flex items-center space-x-1">
            <span className="text-yellow-600 text-xs">{'>_'}</span>
            <span className={`${textClass} ml-1`}>Alcides</span>
          </div>
        )}
        {isUser && (
          <div className={`text-xs ${mutedTextClass} mb-3 font-light tracking-wider text-right`}>
            Você
          </div>
        )}
        <div className={`${textClass} leading-loose ${isUser ? 'text-right' : 'text-left'} font-extralight pr-6`}>
          {message.content.split('\n').map((line, index) => (
            <p key={index} className={index > 0 ? 'mt-4' : ''}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
        <div className={`text-xs ${mutedTextClass} mt-3 ${isUser ? 'text-right' : 'text-left'} font-extralight`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}