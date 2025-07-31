import React from 'react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-8 opacity-0 animate-fadeIn`}>
      <div className={`max-w-2xl ${isUser ? 'bg-zinc-900/50' : 'bg-zinc-900/30'} rounded-3xl px-6 py-5 transition-all duration-500 hover:bg-opacity-60 backdrop-blur-sm`}>
        {!isUser && (
          <div className="text-xs text-yellow-600 mb-3 font-light tracking-wider flex items-center space-x-1">
            <span className="text-yellow-600 text-xs">{'>_'}</span>
            <span className="text-white ml-1">Alcides</span>
          </div>
        )}
        {isUser && (
          <div className="text-xs text-zinc-400 mb-3 font-light tracking-wider text-right">
            Você
          </div>
        )}
        <div className={`text-zinc-100 leading-loose ${isUser ? 'text-right' : 'text-left'} font-extralight`}>
          {message.content.split('\n').map((line, index) => (
            <p key={index} className={index > 0 ? 'mt-4' : ''}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
        <div className={`text-xs text-zinc-600 mt-3 ${isUser ? 'text-right' : 'text-left'} font-extralight`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}