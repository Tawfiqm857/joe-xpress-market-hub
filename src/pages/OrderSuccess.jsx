
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const { theme } = React.useContext(ThemeContext);
  const orderNumber = `JE${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          
          <p className="text-xl mb-2">Your order has been placed successfully.</p>
          <p className="text-lg mb-6">Order Number: <span className="font-semibold">{orderNumber}</span></p>
          
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            
            <div className="space-y-2 mb-6">
              <p>We've sent a confirmation email with your order details.</p>
              <p>You can track your order status in your <Link to="/dashboard" className="text-accent">dashboard</Link>.</p>
            </div>
            
            <div className="border-t border-border pt-4">
              <p className="font-medium">Estimated Delivery: 3-5 business days</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products" className="btn-accent">
              Continue Shopping
            </Link>
            <Link to="/dashboard" className="btn">
              View Order Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
