
import React from 'react';
import { Package, MessageSquare } from 'lucide-react';
import '../../styles/dashboard.css';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-nav animate-fade-in">
      <button
        className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
        onClick={() => setActiveTab('products')}
      >
        <Package size={18} style={{ display: 'inline', marginRight: '8px' }} />
        My Products
      </button>
      
      <button
        className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
        onClick={() => setActiveTab('messages')}
      >
        <MessageSquare size={18} style={{ display: 'inline', marginRight: '8px' }} />
        Messages
      </button>
    </div>
  );
};

export default TabNavigation;
