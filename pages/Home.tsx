
import React, { useEffect, useState } from 'react';
import { Slider } from '../components/Slider';
import { dbService } from '../services/dbService';
import { Product, PageType } from '../types';
import { SERVICES, INITIAL_PRODUCTS } from '../constants';
import { ArrowRight, Star, ShieldCheck, Globe2, Clock, ChevronRight, Ship } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageType, productId?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On demande les produits vedettes, avec fallback demo si vide
    dbService.getFeaturedProducts(true).then(res => {
      setFeaturedProducts(res);
      setIsLoading(false);
    });
  }, []);

  const heroSlides = [
    {
      id: 'h1',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600',
      title: 'Logistique Chine - Inde - Afrique',
      subtitle: 'Facilitez vos importations avec AFTRAS CI. Transport sécurisé, dédouanement fluide et sourcing de qualité.',
      ctaLabel: 'Demander un devis WhatsApp',
      onCtaClick: () => onNavigate('contact')
    },
    {
      id: 'h2',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1600',
      title: 'Votre Partenaire Import-Export',
      subtitle: 'Nous gérons vos expéditions de bout en bout. Excellence opérationnelle et transparence garantie.',
      ctaLabel: 'Voir le catalogue produits',
      onCtaClick: () => onNavigate('catalogue')
    }
  ];

  const serviceSlides = SERVICES.map(s => ({
    id: s.id,
    image: s.image,
    title: s.title,
    subtitle: s.shortDesc,
    ctaLabel: 'Détails du service',
    onCtaClick: () => onNavigate('services')
  }));

  return (
    <div className="space-y-24 pb-24">
      <Slider items={heroSlides} height="h-[80vh] md:h-[90vh]" interval={10000} />

      <section className="max-w-7xl mx-auto px-4 -mt-32 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 border border-slate-100">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1E40AF]">
              <Ship size={32} />
            </div>
            <div>
              <p className="text-3xl font-black text-[#1E40AF]">2500+</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Colis Livrés / Mois</p>
            </div>
          </div>
          <div className="flex items-center gap-6 md:border-x border-slate-100 md:px-8">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#F97316]">
              <Globe2 size={32} />
            </div>
            <div>
              <p className="text-3xl font-black text-[#1E40AF]">3+ Pays</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Hubs Logistiques</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <ShieldCheck size={32} />
            </div>
            <div>
              <p className="text-3xl font-black text-[#1E40AF]">100%</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Suivi Garanti</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-sm font-black text-[#F97316] tracking-[0.3em] uppercase mb-3">Expertise Mondiale</h2>
            <h3 className="text-4xl font-heading font-black text-[#1E40AF]">Nos Solutions Logistiques</h3>
          </div>
          <button 
            onClick={() => onNavigate('services')}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-[#1E40AF] font-black rounded-xl hover:bg-[#1E40AF] hover:text-white transition-all text-sm group"
          >
            Tous les services <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <Slider items={serviceSlides} height="h-[450px] md:h-[550px]" interval={10000} />
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-[#F97316] tracking-[0.3em] uppercase mb-4">Sélection Premium</h2>
          <h3 className="text-4xl font-heading font-black text-[#1E40AF]">Arrivages & Produits Vedettes</h3>
        </div>

        {!isLoading && featuredProducts.length > 0 ? (
          <Slider 
            items={featuredProducts.map(p => ({
              id: p.id,
              image: p.mainImage,
              title: p.name,
              subtitle: p.shortDescription,
              ctaLabel: 'Voir les détails techniques',
              onCtaClick: () => onNavigate('product-detail', p.id)
            }))} 
            height="h-[500px]" 
            interval={10000}
          />
        ) : (
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold uppercase text-xs tracking-widest">
            {isLoading ? "Chargement des pépites AFTRAS..." : "Aucun produit vedette à afficher"}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#001E3C] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <h3 className="text-4xl md:text-5xl font-heading font-black mb-8 relative z-10">Prêt à importer avec les meilleurs ?</h3>
          <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Rejoignez plus de 1000 clients satisfaits. Demandez un devis gratuit et personnalisé pour votre prochain container ou groupage.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-[#F97316] text-white font-black py-5 px-12 rounded-2xl hover:bg-[#ea580c] transition-all shadow-xl hover:scale-105"
            >
              Contact Direct WhatsApp
            </button>
            <button 
              onClick={() => onNavigate('catalogue')}
              className="bg-white text-[#1E40AF] font-black py-5 px-12 rounded-2xl hover:bg-slate-100 transition-all shadow-xl hover:scale-105"
            >
              Parcourir le Catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
