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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [historyWidth, setHistoryWidth] = useState(320); // 80 * 4 = 320px
  const [notesWidth, setNotesWidth] = useState(384); // 96 * 4 = 384px
  const [isDragging, setIsDragging] = useState<'history' | 'notes' | null>(null);
  const [conversations] = useState([
    { id: '1', title: 'Sobre design de interfaces...', timestamp: new Date(), messages: [] },
    { id: '2', title: 'Análise de performance...', timestamp: new Date(Date.now() - 3600000), messages: [] },
    { id: '3', title: 'Estratégias de UX...', timestamp: new Date(Date.now() - 86400000), messages: [] },
    { id: '4', title: 'Implementação de APIs...', timestamp: new Date(Date.now() - 172800000), messages: [] },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleNewConversation = () => {
    setMessages([{
      id: Date.now().toString(),
      content: 'Olá. Sou Claude, sua assistente de IA. Como posso ajudar você hoje?',
      type: 'assistant',
      timestamp: new Date()
    }]);
  };

  const handleClearChat = () => {
    if (confirm('Limpar conversa atual?')) {
      handleNewConversation();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const userMessage: MessageType = {
        id: Date.now().toString() + Math.random(),
        content: `📎 Arquivo anexado: ${file.name} (${file.type})`,
        type: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
    });
  };

  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleNewConversation();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        handleClearChat();
      }
    };
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  const bgClass = isDarkMode ? 'bg-black' : 'bg-gray-50';
  const panelClass = isDarkMode ? 'bg-zinc-950' : 'bg-white';
  const borderClass = isDarkMode ? 'border-zinc-700' : 'border-gray-300';
  const textClass = isDarkMode ? 'text-zinc-100' : 'text-gray-900';
  const mutedTextClass = isDarkMode ? 'text-zinc-400' : 'text-gray-600';

  return (
    <div className={`h-screen ${bgClass} flex flex-col`}>
      {/* Header minimalista */}
      <div className="p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-light text-yellow-600 tracking-wide">
            {'>_'}
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-3 py-1 rounded-lg text-xs ${mutedTextClass} border ${borderClass} hover:border-yellow-600 transition-colors`}
            >
              {isDarkMode ? 'Claro' : 'Escuro'}
            </button>
            <button 
              onClick={handleClearChat}
              className={`px-3 py-1 rounded-lg text-xs ${mutedTextClass} border ${borderClass} hover:border-yellow-600 transition-colors`}
            >
              ⌘L Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Duas colunas principais */}
      <div ref={containerRef} className="flex-1 flex px-8 pb-8 overflow-hidden">
        {/* Coluna do Histórico */}
        <div 
          className={`${panelClass} flex flex-col hidden xl:flex border-r ${borderClass}`}
          style={{ width: `${historyWidth}px`, minWidth: '200px', maxWidth: '500px' }}
        >
          <div className={`p-4 border-b ${borderClass}`}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-transparent border-b ${borderClass} ${textClass} placeholder-${mutedTextClass} py-2 text-sm font-light focus:border-yellow-600 focus:outline-none transition-colors`}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {filteredConversations.map(conv => (
                <div key={conv.id} className={`py-1 hover:bg-${isDarkMode ? 'zinc-900/20' : 'gray-100'} transition-colors cursor-pointer`}>
                  <div className={`text-xs ${mutedTextClass} font-extralight mb-1`}>
                    {conv.timestamp.toLocaleDateString()}
                  </div>
                  <div className={`text-sm ${textClass} font-light`}>
                    {conv.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`border-t ${borderClass} p-4`}>
            <button 
              onClick={handleNewConversation}
              className={`w-full h-10 border ${borderClass} hover:border-yellow-600 rounded-xl ${mutedTextClass} hover:text-yellow-600 text-sm font-light transition-all duration-300`}
            >
              ⌘K Nova Conversa
            </button>
          </div>
        </div>

        {/* Divisória Histórico */}
        <div className="hidden xl:flex items-center justify-center group relative">
          <div 
            className={`w-1 h-full bg-transparent group-hover:bg-${isDarkMode ? 'zinc-500' : 'gray-400'} cursor-col-resize transition-colors duration-200`}
            onMouseDown={() => handleMouseDown('history')}
          />
          <div className="absolute w-4 h-full cursor-col-resize" onMouseDown={() => handleMouseDown('history')} />
        </div>

        {/* Coluna do Chat */}
        <div className={`flex-1 ${panelClass} flex flex-col relative`}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          
          {/* Área do chat */}
          <div 
            className="flex-1 overflow-y-auto p-8"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files);
              files.forEach(file => {
                const userMessage: MessageType = {
                  id: Date.now().toString() + Math.random(),
                  content: `📎 Arquivo anexado: ${file.name} (${file.type})`,
                  type: 'user',
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, userMessage]);
              });
            }}
          >
            <div className="max-w-3xl mx-auto">
              {messages.map((message) => (
                <Message key={message.id} message={message} isDarkMode={isDarkMode} />
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-8 opacity-0 animate-fadeIn">
                  <div className={`max-w-2xl ${isDarkMode ? 'bg-zinc-900/40' : 'bg-gray-100'} rounded-3xl px-6 py-5 backdrop-blur-sm`}>
                    <div className="text-xs text-yellow-600 mb-3 font-light tracking-wider flex items-center space-x-1">
                      <span className="text-yellow-600">{">_"}</span>
                      <span className={`${textClass} ml-1`}>Alcides</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'} rounded-full animate-pulse`}></div>
                      <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'} rounded-full animate-pulse delay-150`}></div>
                      <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'} rounded-full animate-pulse delay-300`}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input do chat */}
          <div className={`border-t ${borderClass} p-4`}>
            <div className="max-w-3xl mx-auto flex items-end space-x-3">
              <div className="flex-1">
                <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} isDarkMode={isDarkMode} />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`h-10 w-10 flex items-center justify-center border border-${isDarkMode ? 'zinc-600' : 'gray-300'} hover:border-yellow-600 rounded-xl transition-all duration-300 ${mutedTextClass} hover:text-yellow-600`}
              >
                📎
              </button>
            </div>

        {/* Divisória Notas */}
        <div className="hidden lg:flex items-center justify-center group relative">
          <div 
            className={`w-1 h-full bg-transparent group-hover:bg-${isDarkMode ? 'zinc-500' : 'gray-400'} cursor-col-resize transition-colors duration-200`}
            onMouseDown={() => handleMouseDown('notes')}
          />
          <div className="absolute w-4 h-full cursor-col-resize" onMouseDown={() => handleMouseDown('notes')} />
        </div>

        {/* Coluna dos Apontamentos */}
        <div 
          className={`${panelClass} flex flex-col hidden lg:flex border-l ${borderClass}`}
          style={{ width: `${notesWidth}px`, minWidth: '250px', maxWidth: '600px' }}
        >
          <Notepad isDarkMode={isDarkMode} />
          
          {/* Botão enviar dos apontamentos - mesma altura que o input do chat */}
          <div className={`border-t ${borderClass} p-4`}>
            <div className="flex justify-end">
              <button className={`h-10 px-3 border border-yellow-600 bg-transparent hover:bg-yellow-600/10 rounded-xl transition-all duration-300 group backdrop-blur-sm`}>
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