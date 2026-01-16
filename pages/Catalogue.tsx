
import React, { useEffect, useState, useMemo } from 'react';
import { dbService } from '../services/dbService';
import { Product, Category, PageType } from '../types';
import { Slider } from '../components/Slider';
import { Filter, Search, Tag, Eye, ChevronRight } from 'lucide-react';

interface CatalogueProps {
  onNavigate: (page: PageType, productId?: string) => void;
}

export const Catalogue: React.FC<CatalogueProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On demande tous les produits (inclut demo si vide)
    dbService.getProducts(true).then(res => {
      setProducts(res.filter(p => p.visible));
      setLoading(false);
    });
    dbService.getCategories().then(setCategories);
  }, []);

  const parents = useMemo(() => categories.filter(c => !c.parentId), [categories]);
  const subcategories = useMemo(() => 
    categories.filter(c => c.parentId && (activeCategory === 'all' || categories.find(p => p.id === c.parentId)?.name === activeCategory)), 
  [categories, activeCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesSub = activeSubcategory === 'all' || p.subcategory === activeSubcategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSub && matchesSearch;
    });
  }, [products, activeCategory, activeSubcategory, searchQuery]);

  const catalogueSliderItems = useMemo(() => {
    return products.slice(0, 5).map(p => ({
      id: p.id,
      image: p.mainImage,
      title: p.category,
      subtitle: p.name,
      ctaLabel: 'Détails',
      onCtaClick: () => onNavigate('product-detail', p.id)
    }));
  }, [products, onNavigate]);

  return (
    <div className="pb-24">
      <Slider items={catalogueSliderItems} height="h-[400px]" />

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <h1 className="text-4xl font-heading font-black text-[#1E40AF]">Notre Catalogue</h1>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F97316] outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => { setActiveCategory('all'); setActiveSubcategory('all'); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'all' ? 'bg-[#F97316] text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300'
              }`}
            >
              Tous les secteurs
            </button>
            {parents.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.name); setActiveSubcategory('all'); }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.name ? 'bg-[#F97316] text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {activeCategory !== 'all' && subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">Sous-catégories:</span>
              <button
                onClick={() => setActiveSubcategory('all')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSubcategory === 'all' ? 'bg-orange-100 text-[#F97316]' : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                Toutes
              </button>
              {subcategories.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub.name)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeSubcategory === sub.name ? 'bg-orange-100 text-[#F97316]' : 'text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-24">
             <Loader2 size={48} className="animate-spin text-[#F97316] mx-auto mb-4" />
             <p className="font-bold text-slate-400">Chargement du catalogue...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#F97316] hover:shadow-2xl transition-all flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.mainImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-[#1E40AF] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => onNavigate('product-detail', product.id)}
                      className="bg-white text-[#F97316] font-bold py-2 px-6 rounded-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                    >
                      <Eye size={18} /> Voir détails
                    </button>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-[#F97316]">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">
                    {product.shortDescription}
                  </p>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-slate-100 text-[#F97316] font-bold py-3 rounded-xl hover:bg-[#F97316] hover:text-white transition-all text-sm"
                  >
                    Demander un devis
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-xl font-bold text-slate-900">Aucun produit trouvé</p>
            <p className="text-slate-500">Essayez de modifier vos filtres.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Loader2 = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
);
