import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: {
    userId: null,
    email: null,
    walletAddress: null,
    isConnected: false
  },
  subscription: {
    plan: 'free',
    status: 'active',
    nextBilling: null,
    price: 0
  },
  purchases: [],
  preferences: {
    theme: 'light',
    notifications: true,
    autoSave: true
  },
  usage: {
    cardsViewed: [],
    searchHistory: [],
    lastActive: null
  }
};

// Action types
const actionTypes = {
  SET_USER: 'SET_USER',
  SET_SUBSCRIPTION: 'SET_SUBSCRIPTION',
  ADD_PURCHASE: 'ADD_PURCHASE',
  SET_PREFERENCES: 'SET_PREFERENCES',
  UPDATE_USAGE: 'UPDATE_USAGE',
  RESET_USER: 'RESET_USER',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE'
};

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case actionTypes.SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: { ...state.subscription, ...action.payload }
      };
    
    case actionTypes.ADD_PURCHASE:
      return {
        ...state,
        purchases: [...state.purchases, {
          purchaseId: `purchase_${Date.now()}`,
          cardId: action.payload.cardId,
          purchaseDate: new Date(),
          amount: action.payload.amount,
          userId: state.user.userId
        }]
      };
    
    case actionTypes.SET_PREFERENCES:
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    
    case actionTypes.UPDATE_USAGE:
      return {
        ...state,
        usage: { ...state.usage, ...action.payload }
      };
    
    case actionTypes.RESET_USER:
      return initialState;
    
    case actionTypes.LOAD_FROM_STORAGE:
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
};

// Create context
const UserContext = createContext();

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('pocketRightsUser');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Convert date strings back to Date objects
        if (parsedData.subscription?.nextBilling) {
          parsedData.subscription.nextBilling = new Date(parsedData.subscription.nextBilling);
        }
        if (parsedData.usage?.lastActive) {
          parsedData.usage.lastActive = new Date(parsedData.usage.lastActive);
        }
        dispatch({ type: actionTypes.LOAD_FROM_STORAGE, payload: parsedData });
      } catch (error) {
        console.error('Error loading user data from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pocketRightsUser', JSON.stringify(state));
  }, [state]);

  // Action creators
  const actions = {
    setUser: (userData) => {
      dispatch({ type: actionTypes.SET_USER, payload: userData });
    },

    connectWallet: (walletAddress, email = null) => {
      const userId = `user_${Date.now()}`;
      dispatch({ 
        type: actionTypes.SET_USER, 
        payload: { 
          userId, 
          email, 
          walletAddress, 
          isConnected: true 
        } 
      });
    },

    disconnectWallet: () => {
      dispatch({ type: actionTypes.RESET_USER });
    },

    setSubscription: (subscriptionData) => {
      dispatch({ type: actionTypes.SET_SUBSCRIPTION, payload: subscriptionData });
    },

    addPurchase: (cardId, amount) => {
      dispatch({ 
        type: actionTypes.ADD_PURCHASE, 
        payload: { cardId, amount } 
      });
    },

    setPreferences: (preferences) => {
      dispatch({ type: actionTypes.SET_PREFERENCES, payload: preferences });
    },

    updateUsage: (usageData) => {
      dispatch({ 
        type: actionTypes.UPDATE_USAGE, 
        payload: { 
          ...usageData, 
          lastActive: new Date() 
        } 
      });
    },

    viewCard: (cardId) => {
      const viewedCards = [...state.usage.cardsViewed];
      if (!viewedCards.includes(cardId)) {
        viewedCards.push(cardId);
      }
      dispatch({ 
        type: actionTypes.UPDATE_USAGE, 
        payload: { 
          cardsViewed: viewedCards,
          lastActive: new Date() 
        } 
      });
    },

    addSearchTerm: (searchTerm) => {
      if (!searchTerm.trim()) return;
      
      const searchHistory = [...state.usage.searchHistory];
      // Remove if already exists to avoid duplicates
      const existingIndex = searchHistory.indexOf(searchTerm);
      if (existingIndex > -1) {
        searchHistory.splice(existingIndex, 1);
      }
      // Add to beginning
      searchHistory.unshift(searchTerm);
      // Keep only last 10 searches
      if (searchHistory.length > 10) {
        searchHistory.pop();
      }
      
      dispatch({ 
        type: actionTypes.UPDATE_USAGE, 
        payload: { 
          searchHistory,
          lastActive: new Date() 
        } 
      });
    }
  };

  // Computed values
  const computed = {
    isPremiumUser: state.subscription.plan === 'premium' && state.subscription.status === 'active',
    
    hasPurchased: (cardId) => {
      return state.purchases.some(purchase => purchase.cardId === cardId);
    },
    
    canAccessCard: (card) => {
      if (!card.isPremium) return true;
      return computed.isPremiumUser || computed.hasPurchased(card.cardId);
    },
    
    totalSpent: state.purchases.reduce((total, purchase) => total + purchase.amount, 0),
    
    memberSince: state.user.userId ? new Date(parseInt(state.user.userId.split('_')[1])) : null,
    
    recentSearches: state.usage.searchHistory.slice(0, 5)
  };

  const value = {
    ...state,
    ...actions,
    ...computed
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
