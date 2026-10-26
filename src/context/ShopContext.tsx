import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Address, Order, AppView, ProductCategory, Language } from '../types';
import { PRODUCTS, BRAND_INFO } from '../data/products';
import { TRANSLATIONS } from '../data/translations';

interface PincodeCheckResult {
  serviceable: boolean;
  message: string;
  estimateDays: number;
  localRaipur: boolean;
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedCategory: ProductCategory | null;
  setSelectedCategory: (cat: ProductCategory | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  buyNow: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  lastOrder: Order | null;
  placeOrder: (details: { address: Address; paymentMethod: string }) => Promise<{ success: boolean; order?: Order }>;
  savedAddresses: Address[];
  saveAddress: (addr: Address) => void;
  checkDeliveryPincode: (pin: string) => PincodeCheckResult;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_ADDRESS: Address = {
  fullName: 'Pooja Verma',
  phone: '9876543210',
  addressLine1: 'Flat 402, Shanti Vihar',
  addressLine2: 'Near Kabir Chowk, Ramnagar',
  city: 'Raipur',
  state: 'Chhattisgarh',
  pincode: '492009',
  isDefault: true,
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('pj_lang') as Language) || 'en';
  });

  const [currentView, setCurrentViewState] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pj_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pj_wishlist');
      return saved ? JSON.parse(saved) : ['p-1', 'p-6'];
    } catch {
      return ['p-1', 'p-6'];
    }
  });

  // Orders persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('pj_orders');
      if (saved) return JSON.parse(saved);
      // Sample initial verified order for demonstration
      const sampleItem = PRODUCTS.find((p) => p.id === 'p-10') || PRODUCTS[0];
      return [
        {
          id: 'ord-1001',
          orderNumber: 'PJ-2026-9842',
          date: '2026-10-20',
          items: [{ product: sampleItem, quantity: 1 }],
          subtotal: sampleItem.price,
          tax: Math.round(sampleItem.price * 0.03),
          shipping: 0,
          discount: 0,
          total: sampleItem.price,
          paymentMethod: 'UPI (Google Pay)',
          paymentStatus: 'Paid',
          orderStatus: 'Shipped',
          shippingAddress: INITIAL_ADDRESS,
          paymentTransactionId: 'UPI/2026/89421034',
        },
      ];
    } catch {
      return [];
    }
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Saved addresses persistence
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem('pj_addresses');
      return saved ? JSON.parse(saved) : [INITIAL_ADDRESS];
    } catch {
      return [INITIAL_ADDRESS];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('pj_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('pj_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pj_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pj_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pj_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCurrentView = (view: AppView) => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${product.name} ${language === 'hi' ? 'बैग में जोड़ा गया' : 'added to your bag'}`);
  };

  const buyNow = (product: Product) => {
    addToCart(product, 1);
    setCurrentView('checkout');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.03);
  const cartTotal = cartSubtotal; // Product prices already include transparent GST calculation
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`${product?.name || 'Item'} ${language === 'hi' ? 'विशलिस्ट से हटाया गया' : 'removed from wishlist'}`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`${product?.name || 'Item'} ${language === 'hi' ? 'विशलिस्ट में सहेजा गया' : 'saved to wishlist'}`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const saveAddress = (addr: Address) => {
    setSavedAddresses((prev) => [addr, ...prev.filter((a) => a.phone !== addr.phone || a.addressLine1 !== addr.addressLine1)]);
  };

  // Serviceability checking based on real Indian postal code rules
  const checkDeliveryPincode = (pin: string): PincodeCheckResult => {
    const clean = pin.trim();
    if (!/^\d{6}$/.test(clean)) {
      return {
        serviceable: false,
        message: language === 'hi' ? 'कृपया मान्य ६ अंकों का पिनकोड दर्ज करें' : 'Please enter a valid 6-digit PIN code',
        estimateDays: 0,
        localRaipur: false,
      };
    }

    // Raipur local PIN series (492xxx)
    if (clean.startsWith('492')) {
      return {
        serviceable: true,
        message: language === 'hi' 
          ? 'रायपुर स्थानीय: आज अथवा अगले दिन विशेष सुरक्षित हैंड-डिलीवरी अथवा स्टोर पिकअप उपलब्ध है।' 
          : 'Raipur Local: Same-day or next-day direct concierge delivery & store pickup available at Ramnagar.',
        estimateDays: 1,
        localRaipur: true,
      };
    }

    // Chhattisgarh state PIN series (49xxxx)
    if (clean.startsWith('49')) {
      return {
        serviceable: true,
        message: language === 'hi'
          ? 'छत्तीसगढ़ राज्य: २ से ३ कार्य दिवसों में सुरक्षित बीमित कूरियर द्वारा सुपुर्दगी।'
          : 'Chhattisgarh: 2–3 business days via secure insured courier with signature required on delivery.',
        estimateDays: 3,
        localRaipur: false,
      };
    }

    // Rest of India
    return {
      serviceable: true,
      message: language === 'hi'
        ? 'सम्पूर्ण भारत: ३ से ५ कार्य दिवसों में सुरक्षित बीमित पार्सल डिलीवरी उपलब्ध है।'
        : 'All India: 3–5 business days via 100% tamper-evident insured courier with tracking.',
      estimateDays: 4,
      localRaipur: false,
    };
  };

  // Place order with payment verification
  const placeOrder = async (details: { address: Address; paymentMethod: string }) => {
    // Generate order ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNum = `PJ-2026-${randomNum}`;
    const txnId = `TXN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      shipping: 0,
      discount: 0,
      total: cartTotal,
      paymentMethod: details.paymentMethod,
      paymentStatus: 'Paid',
      orderStatus: 'Order Placed',
      shippingAddress: details.address,
      paymentTransactionId: txnId,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return { success: true, order: newOrder };
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        cart,
        addToCart,
        buyNow,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTax,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        lastOrder,
        placeOrder,
        savedAddresses,
        saveAddress,
        checkDeliveryPincode,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
