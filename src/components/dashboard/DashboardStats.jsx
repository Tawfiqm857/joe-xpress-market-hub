
import React from 'react';
import { Eye, MessageSquare, Package } from 'lucide-react';
import '../../styles/dashboard.css';

const DashboardStats = ({ stats }) => {
  return (
    <div className="stats-grid animate-fade-in">
      <div className="stats-card animate-slide-left delay-100">
        <div className="stats-title">
          <Eye size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Total Views
        </div>
        <div className="stats-value">{stats.views}</div>
      </div>
      
      <div className="stats-card animate-slide-left delay-200">
        <div className="stats-title">
          <MessageSquare size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Product Enquiries
        </div>
        <div className="stats-value">{stats.enquiries}</div>
      </div>
      
      <div className="stats-card animate-slide-left delay-300">
        <div className="stats-title">
          <Package size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Active Products
        </div>
        <div className="stats-value">{stats.products}</div>
      </div>
    </div>
  );
};

export default DashboardStats;
