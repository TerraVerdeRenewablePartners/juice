import React, {useState} from 'react';
import { hasItem, setItems } from './localStorage';
import ChargingPage from './ChargingPage';
import Onboarding from './Onboarding';
import './App.css';


function App() {
  // Check if the user has set their initial info
  const hasOnboarded = hasItem.hasOnboarded();
  const [showOnboarding, setShowOnboarding] = useState(!hasOnboarded);
  
  return (
    <div className="App">
      {showOnboarding
        ? <Onboarding submit={saveOnboardData} />
        : <ChargingPage />
      }
    </div>
  );
  
  function saveOnboardData (data) {
    setItems({
      ...data,
      hasOnboarded: true
    });
    
    setShowOnboarding(false);
  }
}

export default App;
