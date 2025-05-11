
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { totalItems } = useCart();
  
  return (
    <Link to="/cart" className="relative inline-flex items-center p-2 hover:bg-accent/10 rounded-full transition-colors duration-200">
      <ShoppingCart className="h-6 w-6 hover:text-accent transition-colors" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
