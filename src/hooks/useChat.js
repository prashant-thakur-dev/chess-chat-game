import { useState } from 'react';

export const useChat = (userInfo) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      user: 'Alex', 
      message: 'Good luck with the game!', 
      timestamp: '2:30 PM', 
      isOwn: false 
    },
    { 
      id: 2, 
      user: userInfo?.getDisplayName() || 'You', 
      message: 'Thanks! Let\'s have a great match', 
      timestamp: '2:31 PM', 
      isOwn: true 
    },
    { 
      id: 3, 
      user: 'GameMaster', 
      message: `Welcome ${userInfo?.getDisplayName() || 'Player'}! Game started - White to move first.`, 
      timestamp: '2:32 PM', 
      isSystem: true 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: userInfo?.getDisplayName() || 'You',
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isOwn: true
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate opponent response (for demo purposes)
      setTimeout(() => {
        const responses = [
          'Nice move!',
          'Interesting strategy',
          'Good game so far',
          'That was unexpected',
          'Well played',
          'Hmm, let me think...',
          'Great position!',
          'This is getting intense!'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const opponentMessage = {
          id: messages.length + 2,
          user: 'Alex',
          message: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          isOwn: false
        };
        setMessages(prev => [...prev, opponentMessage]);
      }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }
  };

  const addSystemMessage = (message) => {
    const systemMessage = {
      id: messages.length + 1,
      user: 'System',
      message,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isSystem: true
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    addSystemMessage,
  };
};