
import React from 'react';
import StatsCard from './StatsCard';

const DashboardStats = ({ stats }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    }}>
      <StatsCard title="Total Views" value={stats.views} />
      <StatsCard title="Product Enquiries" value={stats.enquiries} />
      <StatsCard title="Active Products" value={stats.products} />
    </div>
  );
};

export default DashboardStats;
