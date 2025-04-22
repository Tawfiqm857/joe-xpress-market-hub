// Base URL for your API - replace with your actual backend URL when deployed
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      error: error.response.data.message || 'Server error',
      status: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      error: 'No response from server',
      status: 0,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      error: error.message,
      status: 0,
    };
  }
};

// Auth API functions
export const authAPI = {
  register: async (name, email, password) => {
    try {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('joeXpressUsers') || '[]');

      // Check if email already exists
      if (registeredUsers.some((user) => user.email === email)) {
        return {
          success: false,
          error: 'Email already registered',
        };
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // Store password for login verification
      };

      // Add to registered users
      registeredUsers.push(newUser);
      localStorage.setItem('joeXpressUsers', JSON.stringify(registeredUsers));

      // Create user object without password for return
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      return {
        success: true,
        data: {
          user: userWithoutPassword,
          token: `token-${Date.now()}`,
        },
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  login: async (email, password) => {
    try {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('joeXpressUsers') || '[]');

      // Find user with matching email and password
      const matchedUser = registeredUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (!matchedUser) {
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }

      // Create user object without password for return
      const userWithoutPassword = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
      };

      return {
        success: true,
        data: {
          user: userWithoutPassword,
          token: `token-${Date.now()}`,
        },
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// Products API functions
export const productsAPI = {
  getProducts: async () => {
    try {
      console.log('Get Products API call');
      return { success: true, data: [] };
    } catch (error) {
      return handleApiError(error);
    }
  },

  getProduct: async (id) => {
    try {
      console.log('Get Product API call', id);
      return { success: true, data: {} };
    } catch (error) {
      return handleApiError(error);
    }
  },

  addProduct: async (productData, token) => {
    try {
      console.log('Add Product API call', productData);
      return { success: true, data: {} };
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateProduct: async (id, productData, token) => {
    try {
      console.log('Update Product API call', id, productData);
      return { success: true, data: {} };
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteProduct: async (id, token) => {
    try {
      console.log('Delete Product API call', id);
      return { success: true };
    } catch (error) {
      return handleApiError(error);
    }
  },

  getUserProducts: async (token) => {
    try {
      console.log('Get User Products API call');
      return { success: true, data: [] };
    } catch (error) {
      return handleApiError(error);
    }
  },
};