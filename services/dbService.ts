
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, Category } from '../types';
import { INITIAL_PRODUCTS, CATEGORIES } from '../constants';

const PRODUCTS_COLLECTION = 'products';
const CATEGORIES_COLLECTION = 'categories';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const dbService = {
  getProducts: async (includeDefaults = false): Promise<Product[]> => {
    try {
      const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return includeDefaults ? INITIAL_PRODUCTS : [];
      }
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      console.error("Erreur Firestore:", error);
      return includeDefaults ? INITIAL_PRODUCTS : [];
    }
  },

  getFeaturedProducts: async (includeDefaults = false): Promise<Product[]> => {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION), 
        where('featured', '==', true),
        where('visible', '==', true)
      );
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return includeDefaults ? INITIAL_PRODUCTS.filter(p => p.featured) : [];
      }
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      return includeDefaults ? INITIAL_PRODUCTS.filter(p => p.featured) : [];
    }
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Product;
      }
      return INITIAL_PRODUCTS.find(p => p.id === id);
    } catch (error) {
      return INITIAL_PRODUCTS.find(p => p.id === id);
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return CATEGORIES;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
    } catch (error) {
      return CATEGORIES;
    }
  },

  uploadImage: async (base64Str: string): Promise<string> => {
    if (!base64Str || base64Str.startsWith('http')) return base64Str;

    try {
      const formData = new FormData();
      formData.append('file', base64Str);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'aftras_ci_2026'); 

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Erreur Cloudinary");
      }

      const data = await response.json();
      return data.secure_url; 
    } catch (error: any) {
      console.error("Upload failed:", error);
      return base64Str;
    }
  },

  addProduct: async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const mainImageUrl = await dbService.uploadImage(productData.mainImage);
    const galleryUrls = await Promise.all(
      (productData.images || []).map(img => dbService.uploadImage(img))
    );

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      mainImage: mainImageUrl,
      images: galleryUrls,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    return docRef.id;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<void> => {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    
    let mainImageUrl = updates.mainImage;
    if (mainImageUrl && mainImageUrl.startsWith('data:image')) {
      mainImageUrl = await dbService.uploadImage(mainImageUrl);
    }
    
    let galleryUrls = updates.images;
    if (galleryUrls) {
      galleryUrls = await Promise.all(
        galleryUrls.map(img => 
          img.startsWith('data:image') ? dbService.uploadImage(img) : img
        )
      );
    }
    
    await updateDoc(docRef, {
      ...updates,
      mainImage: mainImageUrl,
      images: galleryUrls,
      updatedAt: Date.now()
    });
  },

  deleteProduct: async (id: string): Promise<void> => {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  }
};
