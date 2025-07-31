import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('tom@entre.wtf');
  const [password, setPassword] = useState('*xT1420**');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    setTimeout(() => {
      onLogin();
    }, 1200);
  };

  return (
    <div className="h-screen bg-black flex items-center justify-start">
      <div className="w-full max-w-md ml-12">
        <div className="mb-12">
          <h1 className="text-5xl font-light text-yellow-600 mb-2 tracking-tight">
            {'>_'}
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-800 text-white placeholder-zinc-500 py-3 text-sm font-light focus:border-yellow-600 focus:outline-none transition-colors duration-300"
              placeholder=""
              disabled={isLoggingIn}
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-800 text-white placeholder-zinc-500 py-3 text-sm font-light focus:border-yellow-600 focus:outline-none transition-colors duration-300"
              placeholder=""
              disabled={isLoggingIn}
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="opacity-0"
          >
          </button>
        </form>
      </div>
    </div>
  );
}