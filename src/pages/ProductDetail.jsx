
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, Share2, ChevronLeft, Plus, Minus } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useAuth();
  const { getProductById, isLoaded } = useProducts();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isLoaded) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found
        navigate('/products', { replace: true });
      }
      setLoading(false);
    }
  }, [id, getProductById, navigate, isLoaded]);

  if (loading) {
    return (
      <div className={`${theme}-mode`}>
        <div className="container section">
          <div className="text-center py-12">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="rounded-lg bg-gray-200 dark:bg-gray-700 h-96 w-full"></div>
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(product.price);

  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <Link to="/products" className="inline-flex items-center gap-2 mb-6 hover:text-accent transition-colors">
          <ChevronLeft size={16} />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="text-2xl font-semibold text-accent mb-4">
              {formattedPrice}
            </div>
            
            <div className="mb-6 text-sm inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
              {product.category}
            </div>
            
            <p className="mb-6">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="border border-border rounded-md flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-2 border-r border-border hover:bg-muted"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-2 border-l border-border hover:bg-muted"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                className="btn-accent flex-1 flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              
              <button className="btn flex-1 flex items-center justify-center gap-2">
                <Heart size={20} />
                Wishlist
              </button>
              
              <button className="btn flex items-center justify-center">
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-2">Seller Information</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                  {product.seller?.name.charAt(0) || 'S'}
                </div>
                <div>
                  <p className="font-medium">{product.seller?.name || 'JoeExpress Seller'}</p>
                  {isAuthenticated ? (
                    <button className="text-accent text-sm">Contact Seller</button>
                  ) : (
                    <Link to="/login" className="text-accent text-sm">Login to contact seller</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
