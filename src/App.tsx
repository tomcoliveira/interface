import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import LoginScreen from './components/LoginScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <ChatInterface />;
}

export default App;