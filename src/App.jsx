import React from 'react';
import ResponsiveLayout from './components/Layout/ResponsiveLayout';
import { useResponsive } from './hooks/useResponsive';
import './App.css';

function App() {
  const { isMobile } = useResponsive();

  return (
    <div className="App">
      <ResponsiveLayout />
    </div>
  );
}

export default App;
