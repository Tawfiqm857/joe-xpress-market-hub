
// Sample product data for Joe Express marketplace
const products = [
  {
    id: 1,
    title: "Samsung Galaxy S21",
    price: 450000,
    description: "Brand new Samsung Galaxy S21 with 128GB storage, 8GB RAM. Comes with 1 year warranty and all accessories.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    seller: {
      id: 1,
      name: "TechHub Nigeria",
      location: "Lagos",
      phone: "08012345678"
    }
  },
  {
    id: 2,
    title: "Apple MacBook Pro M1",
    price: 950000,
    description: "Apple MacBook Pro with M1 chip, 13-inch, 8GB RAM, 256GB SSD. Powerful performance with amazing battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    seller: {
      id: 2,
      name: "AppleZone",
      location: "Abuja",
      phone: "08023456789"
    }
  },
  {
    id: 3,
    title: "Nike Air Jordan Sneakers",
    price: 45000,
    description: "Original Nike Air Jordan sneakers, size 42. New in box with all tags.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    seller: {
      id: 3,
      name: "Fashion Connect",
      location: "Port Harcourt",
      phone: "08034567890"
    }
  },
  {
    id: 4,
    title: "3-Bedroom Apartment",
    price: 25000000,
    description: "Luxury 3-bedroom apartment for sale in Lekki Phase 1. Comes with swimming pool, gym, and 24/7 security.",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    seller: {
      id: 4,
      name: "Prime Properties",
      location: "Lagos",
      phone: "08045678901"
    }
  },
  {
    id: 5,
    title: "Toyota Camry 2019",
    price: 7500000,
    description: "Clean Toyota Camry 2019 model, first owner, low mileage, full option with leather seats.",
    category: "Vehicles",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    seller: {
      id: 5,
      name: "AutoMart Nigeria",
      location: "Kano",
      phone: "08056789012"
    }
  },
  {
    id: 6,
    title: "Sony PlayStation 5",
    price: 350000,
    description: "Brand new PlayStation 5 console with 2 controllers and 3 games included.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    seller: {
      id: 1,
      name: "TechHub Nigeria",
      location: "Lagos",
      phone: "08012345678"
    }
  },
  {
    id: 7,
    title: "Italian Leather Sofa",
    price: 350000,
    description: "Luxurious Italian leather sofa set (3+2+1) in pristine condition. Perfect for your living room.",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    seller: {
      id: 6,
      name: "Home Essentials",
      location: "Ibadan",
      phone: "08067890123"
    }
  },
  {
    id: 8,
    title: "Oraimo FreePods 3",
    price: 15000,
    description: "Wireless earbuds with noise cancellation, Bluetooth 5.0, and 30 hours of battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658467415-324e582d6a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    seller: {
      id: 7,
      name: "Gadget World",
      location: "Enugu",
      phone: "08078901234"
    }
  }
];

// Function to format price in Naira
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(price);
};

// Get seller products for dashboard
export const getSellerProducts = (sellerId) => {
  return products.filter(product => product.seller.id === sellerId);
};

export default products;
