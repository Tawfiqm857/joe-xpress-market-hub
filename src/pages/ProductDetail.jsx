
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, Share2, ChevronLeft, Plus, Minus, Check, MapPin, Clock, User } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useAuth();
  const { getProductById, products, isLoaded } = useProducts();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

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

  const similarProducts = products
    .filter(p => p.id !== product?.id && p.category === product?.category)
    .slice(0, 4);

  if (loading) {
    return (
      <div className={`${theme}-mode`}>
        <div className="container section">
          <div className="text-center py-12">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="rounded-lg bg-gray-200 dark:bg-gray-700 h-96 w-full max-w-xl mx-auto"></div>
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
    setAdded(true);
    toast.success(`${product.name} added to cart!`);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleWishlist = () => {
    setWishlist(!wishlist);
    if (!wishlist) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.info(`${product.name} removed from wishlist`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover aspect-square hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="text-2xl font-semibold text-accent mb-4">
              {formattedPrice}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm flex items-center gap-1">
                <MapPin size={14} />
                {product.location || 'Lagos, Nigeria'}
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm flex items-center gap-1">
                <Clock size={14} />
                {product.posted || 'Posted 2 days ago'}
              </span>
            </div>
            
            <p className="mb-6 leading-relaxed">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="border border-border rounded-md flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-2 border-r border-border hover:bg-muted"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-2 border-l border-border hover:bg-muted"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <span className="text-sm">
                {product.stock ? `${product.stock} available` : 'In stock'}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                className={`btn-accent flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                  added ? 'bg-green-600' : ''
                }`}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button 
                className={`btn flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                  wishlist ? 'bg-accent text-white' : ''
                }`}
                onClick={handleWishlist}
              >
                <Heart size={20} fill={wishlist ? 'currentColor' : 'none'} />
                Wishlist
              </button>
              
              <button 
                className="btn flex items-center justify-center p-3 rounded-lg"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-3">Seller Information</h3>
              <div className="flex items-center gap-3 bg-card-light dark:bg-card-dark p-4 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{product.seller?.name || 'JoeExpress Seller'}</p>
                  <p className="text-sm opacity-70">Member since {product.seller?.since || 'January 2023'}</p>
                  {isAuthenticated ? (
                    <button className="text-accent text-sm mt-1 hover:underline">Contact Seller</button>
                  ) : (
                    <Link to="/login" className="text-accent text-sm mt-1 hover:underline">Login to contact seller</Link>
                  )}
                </div>
                <div className="text-right hidden md:block">
                  <div className="font-medium">Rating</div>
                  <div className="flex items-center gap-1 justify-end">
                    {'★★★★☆'}
                    <span className="text-sm">(4.0)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-lg bg-card-light dark:bg-card-dark shadow-md hover:shadow-xl transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg truncate">{relatedProduct.name}</h3>
                      <p className="text-accent font-semibold mt-1">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(relatedProduct.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
