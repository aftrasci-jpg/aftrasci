
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  detailedDescription: string;
  mainImage: string;
  images: string[];
  visible: boolean;
  featured: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  icon: string;
}

export type PageType = 'home' | 'about' | 'services' | 'catalogue' | 'product-detail' | 'contact' | 'admin-login' | 'admin-dashboard';
