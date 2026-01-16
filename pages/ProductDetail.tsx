
import React, { useEffect, useState } from 'react';
import { dbService } from '../services/dbService';
import { Product, PageType } from '../types';
import { Slider } from '../components/Slider';
import { MessageSquare, ArrowLeft, CheckCircle2, Share2, ChevronRight } from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: PageType) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onNavigate }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbService.getProductById(productId).then(p => {
      setProduct(p || null);
      setLoading(false);
    });
    window.scrollTo(0, 0);
  }, [productId]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F97316] border-t-transparent"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Produit non trouvé</h2>
      <button onClick={() => onNavigate('catalogue')} className="text-[#F97316] font-bold hover:underline">
        Retour au catalogue
      </button>
    </div>
  );

  const images = [product.mainImage, ...product.images].map((img, idx) => ({
    id: `img-${idx}`,
    image: img
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
        <button onClick={() => onNavigate('catalogue')} className="hover:text-[#F97316] transition-colors">Catalogue</button>
        <ChevronRight size={14} />
        <span className="text-slate-600">{product.category}</span>
        {product.subcategory && (
          <>
            <ChevronRight size={14} />
            <span className="text-[#F97316]">{product.subcategory}</span>
          </>
        )}
      </div>

      <button 
        onClick={() => onNavigate('catalogue')}
        className="flex items-center gap-2 text-slate-600 hover:text-[#F97316] font-bold mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Retour à la liste
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images Slider */}
        <div className="space-y-4">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
             <Slider items={images} height="h-[450px]" showOverlay={false} />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((img) => (
              <img 
                key={img.id} 
                src={img.image} 
                className="w-20 h-20 object-cover rounded-lg border border-slate-200" 
                alt="thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div>
            <div className="flex gap-2 mb-4">
               <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                {product.category}
              </span>
              {product.subcategory && (
                <span className="inline-block bg-orange-100 text-[#F97316] px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                  {product.subcategory}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Description</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {product.detailedDescription}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100">
            <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
              <CheckCircle2 className="text-[#F97316]" size={18} /> Qualité vérifiée par nos agents en Asie
            </div>
            <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
              <CheckCircle2 className="text-[#F97316]" size={18} /> Sourcing Direct (Chine / Inde)
            </div>
            <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
              <CheckCircle2 className="text-[#F97316]" size={18} /> Solutions de livraison AFTRAS CI incluses
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => onNavigate('contact')}
              className="flex-1 bg-[#F97316] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#ea580c] transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} /> Demander un devis
            </button>
            <button className="bg-slate-100 text-slate-600 p-4 rounded-xl hover:bg-slate-200 transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
