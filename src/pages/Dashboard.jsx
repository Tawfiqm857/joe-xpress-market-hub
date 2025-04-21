
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import DashboardStats from '../components/dashboard/DashboardStats';
import TabNavigation from '../components/dashboard/TabNavigation';
import ProductsContent from '../components/dashboard/ProductsContent';
import MessagesContent from '../components/dashboard/MessagesContent';
import ProfileSection from '../components/dashboard/ProfileSection';
import '../styles/main.css';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { userProducts, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState('products');
  
  // Mock statistics data
  const stats = {
    views: 523,
    enquiries: 32,
    products: userProducts.length
  };
  
  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        deleteProduct(productId);
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete the product. Please try again.');
      }
    }
  };
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <h1 className="page-title animate-text-reveal">Seller Dashboard</h1>
        
        {/* Profile Section */}
        <ProfileSection />
        
        {/* Stats Cards */}
        <DashboardStats stats={stats} />
        
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Tab Content */}
        {activeTab === 'products' && (
          <ProductsContent 
            products={userProducts} 
            onDeleteProduct={handleDeleteProduct} 
          />
        )}
        
        {activeTab === 'messages' && (
          <MessagesContent />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
