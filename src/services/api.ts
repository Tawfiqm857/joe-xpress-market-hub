
// Base URL for your API - replace with your actual backend URL when deployed
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API errors
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      error: error.response.data.message || 'Server error',
      status: error.response.status
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      error: 'No response from server',
      status: 0
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      error: error.message,
      status: 0
    };
  }
};

// Auth API functions
export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    try {
      // In a real application, this would be an API call to a backend server
      // For now, we'll use localStorage for demo purposes
      
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('joeXpressUsers') || '[]');
      
      // Check if email already exists
      if (registeredUsers.some((user: any) => user.email === email)) {
        return { 
          success: false, 
          error: 'Email already registered' 
        };
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password // Store password for login verification
      };
      
      // Add to registered users
      registeredUsers.push(newUser);
      localStorage.setItem('joeXpressUsers', JSON.stringify(registeredUsers));
      
      // Create user object without password for return
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      return { 
        success: true, 
        data: { 
          user: userWithoutPassword, 
          token: `token-${Date.now()}` 
        } 
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  login: async (email: string, password: string) => {
    try {
      // In a real application, this would be an API call to a backend server
      // For now, we'll use localStorage for demo purposes
      
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('joeXpressUsers') || '[]');
      
      // Find user with matching email and password
      const matchedUser = registeredUsers.find(
        (user: any) => user.email === email && user.password === password
      );
      
      if (!matchedUser) {
        return { 
          success: false, 
          error: 'Invalid email or password' 
        };
      }
      
      // Create user object without password for return
      const userWithoutPassword = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email
      };
      
      return { 
        success: true, 
        data: { 
          user: userWithoutPassword, 
          token: `token-${Date.now()}` 
        } 
      };
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Products API functions
export const productsAPI = {
  // Get all products
  getProducts: async () => {
    try {
      // This is a mock for now - replace with actual API call
      console.log('Get Products API call');
      // Mock data from local storage or imports
      return { success: true, data: [] };
      
      // Actual implementation would be:
      // const response = await fetch(`${API_BASE_URL}/products`);
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Get a single product by ID
  getProduct: async (id: string) => {
    try {
      console.log('Get Product API call', id);
      // Mock data
      return { success: true, data: {} };
      
      // Actual implementation would be:
      // const response = await fetch(`${API_BASE_URL}/products/${id}`);
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Add a new product
  addProduct: async (productData: FormData, token: string) => {
    try {
      console.log('Add Product API call', productData);
      // Mock success
      return { success: true, data: {} };
      
      // Actual implementation would be:
      // const response = await fetch(`${API_BASE_URL}/products`, {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${token}` },
      //   body: productData  // FormData for file uploads
      // });
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Update a product
  updateProduct: async (id: string, productData: FormData, token: string) => {
    try {
      console.log('Update Product API call', id, productData);
      // Mock success
      return { success: true, data: {} };
      
      // Actual implementation would be:
      // const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Authorization': `Bearer ${token}` },
      //   body: productData
      // });
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Delete a product
  deleteProduct: async (id: string, token: string) => {
    try {
      console.log('Delete Product API call', id);
      // Mock success
      return { success: true };
      
      // Actual implementation would be:
      // const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      //   method: 'DELETE',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Get user's products
  getUserProducts: async (token: string) => {
    try {
      console.log('Get User Products API call');
      // Mock data
      return { success: true, data: [] };
      
      // Actual implementation would be:
      // const response = await fetch(`${API_BASE_URL}/my-products`, {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  }
};
