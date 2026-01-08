export interface Product {
  _id?: string;
  name: string;
  description: string;
  longDescription?: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  frameType: 'full-rim' | 'semi-rimless' | 'rimless' | 'browline' | 'cat-eye' | 'round' | 'square' | 'aviator';
  frameMaterial: 'acetate' | 'metal' | 'titanium' | 'plastic' | 'wood' | 'carbon-fiber';
  frameColor: {
    primary: string;
    secondary?: string;
    finish?: 'matte' | 'glossy' | 'satin' | 'metallic';
  };
  lensType: 'single-vision' | 'bifocal' | 'progressive' | 'reading' | 'sunglasses';
  lensMaterial?: 'polycarbonate' | 'trivex' | 'high-index' | 'glass';
  gender: 'men' | 'women' | 'unisex' | 'kids';
  size: {
    eye: number;
    bridge: number;
    temple: number;
  };
  features?: string[];
  specifications?: {
    weight?: string;
    lensWidth?: string;
    bridgeWidth?: string;
    templeLength?: string;
    frameWidth?: string;
    lensHeight?: string;
    warranty?: string;
  };
  careInstructions?: string;
  whatsIncluded?: string[];
  lensOptions?: {
    availableTypes?: string[];
    availableCoatings?: string[];
    availableTints?: string[];
    prescriptionRange?: {
      sphere?: { min?: number; max?: number };
      cylinder?: { min?: number; max?: number };
    };
  };
  ratings?: {
    average: number;
    count: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  phone?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  _id?: string;
  user: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: 'card' | 'paypal' | 'cash-on-delivery';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentIntentId?: string;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingCost: number;
  tax: number;
  totalPrice: number;
  trackingNumber?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  prescription?: string;
  lensOptions?: {
    type?: string;
    coating?: string[];
    tint?: string;
  };
}

