import { useEffect, useState } from 'react';

export const useUsername = () => {
  const [username, setUsername] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  // Check if username was previously set (optional - for persistence)
  useEffect(() => {
    const savedUsername = localStorage.getItem('chess-username');
    const savedGuestMode = localStorage.getItem('chess-guest-mode') === 'true';
    
    if (savedUsername) {
      setUsername(savedUsername);
      setIsGuest(savedGuestMode);
      setIsUsernameSet(true);
      setShowPopup(false);
    }
  }, []);

  const setUserInfo = (name, guestMode = false) => {
    setUsername(name);
    setIsGuest(guestMode);
    setIsUsernameSet(true);
    setShowPopup(false);

    // Save to localStorage for persistence (optional)
    localStorage.setItem('chess-username', name);
    localStorage.setItem('chess-guest-mode', guestMode.toString());
  };

  const resetUsername = () => {
    setUsername('');
    setIsGuest(false);
    setIsUsernameSet(false);
    setShowPopup(true);
    
    // Clear localStorage
    localStorage.removeItem('chess-username');
    localStorage.removeItem('chess-guest-mode');
  };

  const getDisplayName = () => {
    if (!isUsernameSet) return 'Player';
    return isGuest ? 'Guest' : username;
  };

  const getUserBadge = () => {
    if (isGuest) return '👤';
    return '👑';
  };

  return {
    username,
    isGuest,
    isUsernameSet,
    showPopup,
    setUserInfo,
    resetUsername,
    getDisplayName,
    getUserBadge,
  };
};