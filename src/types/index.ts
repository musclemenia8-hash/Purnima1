export type Language = 'en' | 'hi';

export type ProductCategory = 'Necklaces' | 'Earrings' | 'Pendants & Chains';

export interface Product {
  id: string;
  name: string;
  nameHi: string;
  category: ProductCategory;
  categoryHi: string;
  weightGrams: number;
  goldPurity: string; // e.g. "22K (916 Hallmarked)"
  goldPrice: number;
  makingCharges: number;
  gst: number;
  price: number;
  originalPrice?: number;
  images: string[];
  modelImage?: string;
  description: string;
  descriptionHi: string;
  specifications: {
    metal: string;
    purity: string;
    grossWeight: string;
    netGoldWeight: string;
    stoneDetails?: string;
    hallmark: string;
    occasion: string;
  };
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';
export type OrderStatus = 'Order Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: Address;
  paymentTransactionId?: string;
}

export type AppView =
  | 'home'
  | 'shop'
  | 'category'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'wishlist'
  | 'orders'
  | 'account'
  | 'contact'
  | 'about'
  | 'policy-shipping'
  | 'policy-returns'
  | 'policy-privacy'
  | 'policy-terms'
  | 'faqs';
