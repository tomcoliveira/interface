import React from 'react';
import { Terminal } from 'lucide-react';

export default function Header() {
  return (
    <div className="border-b border-zinc-900/30 bg-black/80 backdrop-blur-xl p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-3">
          <span className="text-yellow-600 text-lg font-light">{'>'}_</span>
          <div>
            <h1 className="text-xl font-light text-zinc-100 tracking-wide flex items-center space-x-2">
              Alcides
            </h1>
            <p className="text-zinc-500 text-xs font-light mt-1 tracking-wider">
              Na prática a teoria é outra
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}