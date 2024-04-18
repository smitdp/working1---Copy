import './AdminAnalytics.css';
import React, { useState } from 'react';
import AgentAnalytics from './AgentAnalytics/AgentAnalytics';
import ClaimAnalytics from './ClaimAnalytics/ClaimAnalytics';
import PolicyAnalytics from './PolicyAnalytics/PolicyAnalytics';
import UserAnalytics from './UserAnalytics/UserAnalytics';
import AuditLogAnalytics from './AuditLogAnalytics/AuditLogAnalytics';

export default function AdminAnalytics() {
const [selectedComponent, setSelectedComponent] = useState("Agent Analytics");

  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
  };
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'User Analytics':
        return <UserAnalytics />;
      case 'Policy Analytics':
        return <PolicyAnalytics />;
      case 'Claim Analytics':
        return <ClaimAnalytics />;
      case 'Agent Analytics':
        return <AgentAnalytics />;
      case 'AuditLog Analytics':
        return <AuditLogAnalytics />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div class="container">
  <div class="button" onClick={() => handleClick('User Analytics')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-2h2v2zm0-4h-2v-6h2v6zm4 4h-2v-2h2v2zm0-4h-2v-6h2v6z"/>
    </svg>
    User Analytics
  </div>
  <div class="button" onClick={() => handleClick('Policy Analytics')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M16 1H8C5.79 1 4 2.79 4 5v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-2.21-1.79-4-4-4zm-1 14h-2v-2h2v2zm0-4h-2v-6h2v6zm4 4h-2v-2h2v2zm0-4h-2v-6h2v6z"/>
    </svg>
    Policy Analytics
  </div>
  <div class="button" onClick={() => handleClick('Claim Analytics')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 18h-2v-2h2v2zm0-4h-2v-8h2v8zm4 4h-2v-2h2v2zm0-4h-2v-8h2v8zm2-14h-4v-2h4v2z"/>
    </svg>
    Claim Analytics
  </div>
  <div class="button" onClick={() => handleClick('Agent Analytics')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2v-6h2v6zm4 4h-2v-2h2v2zm0-4h-2v-6h2v6z"/>
    </svg>
    Agent Analytics
  </div>
  <div class="button" onClick={() => handleClick('AuditLog Analytics')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 1C6.48 1 2 5.48 2 11c0 4.9 3.58 8.93 8.25 9.67.37.09.75.15 1.15.16h.1c5.34 0 9.65-4.3 9.65-9.64C21.99 5.5 17.5 1 12 1zm5 15.24c0 2.08-1.69 3.77-3.77 3.77-2.08 0-3.77-1.69-3.77-3.77s1.69-3.77 3.77-3.77c2.08 0 3.77 1.69 3.77 3.77z"/>
    </svg>
    Audit Log
  </div>
</div>

      {renderComponent()}
    </div>
  );
}