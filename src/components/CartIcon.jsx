
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { totalItems } = useCart();
  
  return (
    <Link to="/cart" className="relative inline-flex items-center p-3 hover:bg-accent/10 rounded-xl transition-all duration-300 group">
      <ShoppingCart className="h-6 w-6 group-hover:text-accent transition-colors duration-300" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
