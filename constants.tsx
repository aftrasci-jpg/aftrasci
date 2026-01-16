
import { Service, Category, Product } from './types';

export const COLORS = {
  primary: '#F97316', // Orange du Logo (Orange 500) - Devient la couleur d'action
  secondary: '#1E40AF', // Bleu du Logo (Blue 800) - Pour les fonds et textes sombres
  accent: '#3B82F6', // Blue 500
  darkNavy: '#1E40AF', 
  light: '#F8FAFC', // Slate 50
};

export const LOGO_URL = '/assets/logos.png';

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Fret Maritime & Aérien',
    shortDesc: 'Solutions complètes de transport depuis la Chine et l\'Inde.',
    longDesc: 'Nous gérons vos expéditions de bout en bout, de l\'enlèvement chez le fournisseur à la livraison finale en Afrique. Nos partenariats avec les plus grandes compagnies maritimes garantissent des tarifs compétitifs et des délais respectés.',
    image: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=800',
    icon: 'ship'
  },
  {
    id: 's2',
    title: 'Groupage (LCL)',
    shortDesc: 'Importez de petites quantités sans louer un container entier.',
    longDesc: 'Idéal pour les PME, notre service de groupage vous permet de partager l\'espace d\'un container. Payez uniquement pour le volume que vous utilisez tout en bénéficiant de la sécurité du transport maritime.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    icon: 'package'
  },
  {
    id: 's3',
    title: 'Sourcing & Inspection',
    shortDesc: 'Trouvez les meilleurs fournisseurs en Asie avec AFTRAS CI.',
    longDesc: 'Nos agents sur place en Chine et en Inde identifient, vérifient et auditent vos futurs partenaires commerciaux. Nous effectuons des contrôles qualité rigoureux avant chaque expédition pour éviter les mauvaises surprises.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800',
    icon: 'search'
  },
  {
    id: 's4',
    title: 'Dédouanement Express',
    shortDesc: 'Simplifiez vos formalités administratives à Abidjan.',
    longDesc: 'Expertise locale pour un passage en douane fluide. Nous préparons toute la documentation nécessaire et gérons les interactions avec les autorités portuaires pour libérer vos marchandises dans les plus brefs délais.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
    icon: 'file-text'
  }
];

export const CATEGORIES: Category[] = [
  { id: 'p_mob', name: 'Mobilité et transport', description: 'Solutions de transport et mobility', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_mob_1', parentId: 'p_mob', name: 'Matériels roulants', description: 'Véhicules et engins', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_mob_2', parentId: 'p_mob', name: 'Fauteuil roulant', description: 'Mobilité réduite', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 'p_mach', name: 'Machines et équipements professionnels', description: 'Outils industriels et pro', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_mach_1', parentId: 'p_mach', name: 'Machines', description: 'Machines industrielles', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_mach_2', parentId: 'p_mach', name: 'Matériels bureautiques', description: 'Informatique et bureau', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_mach_3', parentId: 'p_mach', name: 'Matériels médicaux', description: 'Santé et cliniques', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_mach_4', parentId: 'p_mach', name: 'Matériels agricoles', description: 'Agriculture moderne', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 'p_mob_conf', name: 'Mobilier et confort', description: 'Aménagement intérieur', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_conf_1', parentId: 'p_mob_conf', name: 'Fauteuil de bureau', description: 'Ergonomie au travail', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_conf_2', parentId: 'p_mob_conf', name: 'Fauteuil de massage', description: 'Détente et bien-être', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 's_conf_3', parentId: 'p_mob_conf', name: 'Équipement de maison', description: 'Appareils domestiques', createdAt: Date.now(), updatedAt: Date.now() },
  { id: 'p_mode', name: 'Accessoires et mode', description: 'Tendances et style', createdAt: Date.now(), updatedAt: Date.now() }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Générateur Industriel 50kVA',
    category: 'Machines et équipements professionnels',
    subcategory: 'Machines',
    shortDescription: 'Puissance fiable pour vos chantiers.',
    detailedDescription: 'Ce groupe électrogène de haute performance est conçu pour une utilisation intensive. Moteur diesel robuste, faible consommation et insonorisation de pointe.',
    mainImage: 'https://images.unsplash.com/photo-1620050807844-3253b8f108f9?auto=format&fit=crop&q=80&w=600',
    images: ['https://images.unsplash.com/photo-1590234730620-804153097cc4?auto=format&fit=crop&q=80&w=600'],
    visible: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'p2',
    name: 'Lot de Smartphones Android 2025',
    category: 'Machines et équipements professionnels',
    subcategory: 'Matériels bureautiques',
    shortDescription: 'Écrans 120Hz, triple caméra, 5G.',
    detailedDescription: 'Dernière génération de smartphones polyvalents. Idéal pour la revente. Garantie constructeur incluse et SAV local assuré par AFTRAS CI.',
    mainImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    images: [],
    visible: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'p3',
    name: 'Fauteuil Roulant Électrique Pro',
    category: 'Mobilité et transport',
    subcategory: 'Fauteuil roulant',
    shortDescription: 'Autonomie 25km, pliable.',
    detailedDescription: 'Fauteuil roulant électrique haute performance avec commande joystick intuitive. Confort optimal pour une utilisation quotidienne.',
    mainImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    images: [],
    visible: true,
    featured: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'p4',
    name: 'Fauteuil de Bureau Ergonomique Elite',
    category: 'Mobilier et confort',
    subcategory: 'Fauteuil de bureau',
    shortDescription: 'Support lombaire 4D, assise respirante.',
    detailedDescription: 'Le summum du confort pour les longues heures de travail. Design moderne et réglages personnalisables.',
    mainImage: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=600',
    images: [],
    visible: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];
