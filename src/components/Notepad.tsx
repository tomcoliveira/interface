import React, { useState, useRef } from 'react';

export default function Notepad() {
  const [content, setContent] = useState('');
  const [bulletMode, setBulletMode] = useState(false);
  const [currentColor, setCurrentColor] = useState(0); // 0=branco, 1=amarelo, 2=cinza
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const colorNames = ['branco', 'amarelo', 'cinza'];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Enter no modo bullet
    if (e.key === 'Enter' && bulletMode) {
      e.preventDefault();
      const cursorPos = textarea.selectionStart;
      const newText = content.slice(0, cursorPos) + '\n_ ' + content.slice(cursorPos);
      setContent(newText);
      setTimeout(() => {
        textarea.setSelectionRange(cursorPos + 3, cursorPos + 3);
      }, 0);
      return;
    }

    // Detecção de comandos com espaço
    if (e.key === ' ') {
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = content.slice(0, cursorPos);
      const words = textBeforeCursor.split(/\s+/);
      const lastWord = words[words.length - 1];

      // Comandos disponíveis
      if (lastWord === '/bullet') {
        e.preventDefault();
        setBulletMode(!bulletMode);
        // Remove o comando do texto
        const newText = content.slice(0, cursorPos - 7) + content.slice(cursorPos);
        setContent(newText);
        setTimeout(() => {
          textarea.setSelectionRange(cursorPos - 7, cursorPos - 7);
        }, 0);
      } else if (lastWord === '/color1') {
        e.preventDefault();
        setCurrentColor(0);
        const newText = content.slice(0, cursorPos - 7) + content.slice(cursorPos);
        setContent(newText);
        setTimeout(() => {
          textarea.setSelectionRange(cursorPos - 7, cursorPos - 7);
        }, 0);
      } else if (lastWord === '/color2') {
        e.preventDefault();
        setCurrentColor(1);
        const newText = content.slice(0, cursorPos - 7) + content.slice(cursorPos);
        setContent(newText);
        setTimeout(() => {
          textarea.setSelectionRange(cursorPos - 7, cursorPos - 7);
        }, 0);
      } else if (lastWord === '/color3') {
        e.preventDefault();
        setCurrentColor(2);
        const newText = content.slice(0, cursorPos - 7) + content.slice(cursorPos);
        setContent(newText);
        setTimeout(() => {
          textarea.setSelectionRange(cursorPos - 7, cursorPos - 7);
        }, 0);
      } else if (lastWord === '/help') {
        e.preventDefault();
        const helpText = `\n\nComandos disponíveis:
/bullet - ativar/desativar modo bullets
/color1 - texto branco
/color2 - texto amarelo  
/color3 - texto cinza
/help - mostrar esta ajuda

Status: ${bulletMode ? 'MODO BULLET ATIVO' : 'Modo normal'}
Cor atual: ${colorNames[currentColor]}
\n`;
        const newText = content.slice(0, cursorPos - 5) + helpText + content.slice(cursorPos);
        setContent(newText);
        setTimeout(() => {
          textarea.setSelectionRange(cursorPos - 5 + helpText.length, cursorPos - 5 + helpText.length);
        }, 0);
      }
    }

    if (e.key === 'Escape') {
      setBulletMode(false);
      setCurrentColor(0);
    }
  };

  const getTextColor = () => {
    switch (currentColor) {
      case 1: return '#ffb91a'; // amarelo
      case 2: return '#a1a1aa'; // cinza
      default: return '#ffffff'; // branco
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Indicador de modo bullet */}
      {bulletMode && (
        <div className="absolute top-2 right-2 bg-yellow-600/20 text-yellow-600 px-2 py-1 rounded text-xs font-light z-10">
          BULLET MODE
        </div>
      )}
      
      {/* Indicador de cor */}
      {currentColor > 0 && (
        <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-light z-10" style={{backgroundColor: 'rgba(0,0,0,0.3)', color: getTextColor()}}>
          COR: {colorNames[currentColor].toUpperCase()}
        </div>
      )}
      
      {/* Área de edição */}
      <div className="flex-1 p-6 relative pt-8">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-zinc-900/30 rounded-xl p-4 font-extralight text-base leading-relaxed focus:outline-none resize-none selection:bg-yellow-600/30 focus:ring-2 focus:ring-yellow-600/50 transition-all duration-300 border-0"
          style={{ 
            minHeight: '100%',
            color: getTextColor()
          }}
          placeholder="// "
        />
      </div>
    </div>
  );
}