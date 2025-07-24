import React from 'react';
import ResponsiveLayout from './components/Layout/ResponsiveLayout';
import UsernamePopup from './components/UI/UsernamePopup';
import { useResponsive } from './hooks/useResponsive';
import { useUsername } from './hooks/useUsername';
import './App.css';

function App() {
  const { isMobile } = useResponsive();
  const userInfo = useUsername();

  return (
    <div className="App">
      {/* Username Popup */}
      <UsernamePopup
        isOpen={userInfo.showPopup}
        onSubmit={userInfo.setUserInfo}
        onClose={() => {}} // Popup is mandatory, no close without username
      />
      
      {/* Main Game Interface */}
      {userInfo.isUsernameSet && (
        <ResponsiveLayout userInfo={userInfo} />
      )}
    </div>
  );
}

export default App;