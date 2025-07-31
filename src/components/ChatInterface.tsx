import React, { useState, useRef, useEffect } from 'react';
import { Send, History } from 'lucide-react';
import { Message as MessageType } from '../types';
import Message from './Message';
import InputArea from './InputArea';
import NotionButton from './NotionButton';
import Notepad from './Notepad';

export default function ChatInterface() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: 'Olá. Sou Claude, sua assistente de IA. Como posso ajudar você hoje?',
      type: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyWidth, setHistoryWidth] = useState(320); // 80 * 4 = 320px
  const [notesWidth, setNotesWidth] = useState(384); // 96 * 4 = 384px
  const [isDragging, setIsDragging] = useState<'history' | 'notes' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        `Entendi sua pergunta sobre "${content}".\n\nAqui está uma resposta elaborada e precisa. Esta interface representa o estado da arte em design de conversação, combinando estética minimalista com funcionalidade máxima.\n\nCada elemento foi cuidadosamente posicionado para criar uma experiência fluida e natural.`,
        `Interessante pergunta.\n\nO que você está vendo aqui é o resultado de design thinking aplicado à conversação humano-máquina. Cada pixel tem propósito, cada transição tem significado.\n\nA simplicidade é a sofisticação suprema.`,
        `Processando sua solicitação...\n\nEsta interface foi construída seguindo os princípios do liquid design, onde cada elemento flui naturalmente para o próximo. O fundo escuro reduz a fadiga visual, enquanto o amarelo cria pontos focais estratégicos.\n\nO resultado é uma experiência quase telepática.`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        type: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, Math.random() * 1000 + 1500);
  };

  const handleMouseDown = (divider: 'history' | 'notes') => {
    setIsDragging(divider);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left - 32; // Subtrair padding

    if (isDragging === 'history') {
      const newWidth = Math.max(200, Math.min(500, mouseX));
      setHistoryWidth(newWidth);
    } else if (isDragging === 'notes') {
      const containerWidth = containerRect.width - 64; // Subtrair padding total
      const newWidth = Math.max(250, Math.min(600, containerWidth - mouseX));
      setNotesWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header minimalista */}
      <div className="p-8">
        <div className="flex justify-start items-center">
          <h1 className="text-3xl font-light text-yellow-600 tracking-wide">
            {'>_'}
          </h1>
        </div>
      </div>

      {/* Duas colunas principais */}
      <div ref={containerRef} className="flex-1 flex px-8 pb-8 overflow-hidden">
        {/* Coluna do Histórico */}
        <div 
          className="bg-zinc-950 flex flex-col hidden xl:flex"
          style={{ width: `${historyWidth}px`, minWidth: '200px', maxWidth: '500px' }}
        >
          <div className="p-6 border-b border-zinc-900/50">
            <div className="flex items-center">
              <History className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              <div className="py-1 hover:bg-zinc-900/20 transition-colors cursor-pointer">
                <div className="text-xs text-zinc-600 font-extralight mb-1">Hoje, 14:32</div>
                <div className="text-base text-zinc-200 font-light">Sobre design de interfaces...</div>
              </div>
              
              <div className="py-1 hover:bg-zinc-900/20 transition-colors cursor-pointer">
                <div className="text-xs text-zinc-600 font-extralight mb-1">Hoje, 13:15</div>
                <div className="text-base text-zinc-200 font-light">Análise de performance...</div>
              </div>
              
              <div className="py-1 hover:bg-zinc-900/20 transition-colors cursor-pointer">
                <div className="text-xs text-zinc-600 font-extralight mb-1">Ontem, 16:45</div>
                <div className="text-base text-zinc-200 font-light">Estratégias de UX...</div>
              </div>
              
              <div className="py-1 hover:bg-zinc-900/20 transition-colors cursor-pointer">
                <div className="text-xs text-zinc-600 font-extralight mb-1">Ontem, 11:20</div>
                <div className="text-base text-zinc-200 font-light">Implementação de APIs...</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-zinc-900/50 p-6">
            <button className="w-full h-12 border border-zinc-700 hover:border-zinc-600 rounded-xl text-zinc-400 hover:text-zinc-300 text-sm font-light transition-all duration-300">
              Nova Conversa
            </button>
          </div>
        </div>

        {/* Divisória Histórico */}
        <div className="hidden xl:flex items-center justify-center group relative">
          <div 
            className="w-1 h-full bg-transparent group-hover:bg-zinc-700/50 cursor-col-resize transition-colors duration-200"
            onMouseDown={() => handleMouseDown('history')}
          />
          <div className="absolute w-4 h-full cursor-col-resize" onMouseDown={() => handleMouseDown('history')} />
        </div>

        {/* Coluna do Chat */}
        <div className="flex-1 bg-zinc-950 flex flex-col relative">
          {/* Área do chat */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-8 opacity-0 animate-fadeIn">
                  <div className="max-w-2xl bg-zinc-900/30 rounded-3xl px-6 py-5 backdrop-blur-sm">
                    <div className="text-xs text-yellow-600 mb-3 font-light tracking-wider flex items-center space-x-1">
                      <span className="text-yellow-600">{">_"}</span>
                      <span className="text-white ml-1">Claude</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse delay-150"></div>
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input do chat */}
          <div className="border-t border-zinc-900/50 p-4">
            <div className="max-w-3xl mx-auto flex items-end space-x-3">
              <div className="flex-1">
                <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>

        {/* Divisória Notas */}
        <div className="hidden lg:flex items-center justify-center group relative">
          <div 
            className="w-1 h-full bg-transparent group-hover:bg-zinc-700/50 cursor-col-resize transition-colors duration-200"
            onMouseDown={() => handleMouseDown('notes')}
          />
          <div className="absolute w-4 h-full cursor-col-resize" onMouseDown={() => handleMouseDown('notes')} />
        </div>

        {/* Coluna dos Apontamentos */}
        <div 
          className="bg-zinc-950 flex flex-col hidden lg:flex"
          style={{ width: `${notesWidth}px`, minWidth: '250px', maxWidth: '600px' }}
        >
          <Notepad />
          
          {/* Botão enviar dos apontamentos - mesma altura que o input do chat */}
          <div className="border-t border-zinc-900/50 p-4">
            <div className="flex justify-end">
              <button className="h-10 px-3 border border-yellow-600 bg-transparent hover:bg-yellow-600/10 rounded-xl transition-all duration-300 group backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="text-yellow-600 text-sm font-light group-hover:scale-110 transition-transform duration-300">
                  {'>_'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}