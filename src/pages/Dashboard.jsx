
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
    <div className={`${theme}-mode min-h-screen`}>
      <div className="container py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 animate-fade-in">
            Seller Dashboard
          </h1>
          <p className="text-base md:text-lg text-muted-foreground animate-fade-in delay-100">
            Manage your products, track performance, and grow your business
          </p>
        </div>
        
        {/* Profile Section */}
        <div className="mb-8 animate-fade-in delay-200">
          <ProfileSection />
        </div>
        
        {/* Stats Cards */}
        <div className="mb-8 animate-fade-in delay-300">
          <DashboardStats stats={stats} />
        </div>
        
        {/* Tab Navigation */}
        <div className="mb-6 animate-fade-in delay-400">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        {/* Tab Content */}
        <div className="animate-fade-in delay-500">
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
    </div>
  );
};

export default Dashboard;
