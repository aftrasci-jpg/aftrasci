
import React from 'react';
import { Slider } from '../components/Slider';
import { SERVICES } from '../constants';
import { PageType } from '../types';
import { Ship, Package, Search, FileText, ArrowRight, CheckCircle } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: PageType) => void;
}

const iconMap = {
  ship: <Ship size={32} />,
  package: <Package size={32} />,
  search: <Search size={32} />,
  'file-text': <FileText size={32} />
};

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  // Slider items specifically for the services page
  const serviceSliderItems = SERVICES.map(service => ({
    id: service.id,
    image: service.image,
    title: service.title,
    subtitle: service.longDesc.substring(0, 150) + '...',
    ctaLabel: 'Demander un devis',
    onCtaClick: () => onNavigate('contact')
  }));

  return (
    <div className="pb-24">
      {/* Page Header / Slider */}
      <section className="relative">
        <Slider items={serviceSliderItems} height="h-[600px]" interval={10000} />
      </section>

      {/* Intro Text */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-sm font-bold text-[#F97316] tracking-widest uppercase mb-4">Notre Expertise Logistique</h2>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-[#1E40AF] mb-8">
          Des solutions sur mesure pour votre commerce international
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          AFTRAS CI n'est pas seulement un transporteur. Nous sommes votre partenaire stratégique en Côte d'Ivoire, 
          facilitant chaque étape de votre chaîne d'approvisionnement depuis les hubs industriels d'Asie jusqu'à vous.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-[#F97316] hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="bg-[#F97316] p-3 rounded-xl inline-block mb-4 shadow-lg">
                      {iconMap[service.icon as keyof typeof iconMap] || <Ship size={32} />}
                    </div>
                    <h3 className="text-2xl font-bold font-heading">{service.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                  {service.longDesc}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle className="text-[#F97316]" size={18} /> Suivi en temps réel disponible
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle className="text-[#F97316]" size={18} /> Assurance transport incluse
                  </div>
                </div>

                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-[#F97316] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ea580c] transition-all shadow-lg active:scale-95"
                >
                  Obtenir un devis personnalisé <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-50 mt-24 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl font-black text-[#F97316] mb-2">98%</div>
              <div className="text-xl font-bold text-slate-900 mb-2">Satisfaction Client</div>
              <p className="text-sm text-slate-500">Un taux de recommandation exceptionnel de la part de nos importateurs.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[#F97316] mb-2">+5000</div>
              <div className="text-xl font-bold text-slate-900 mb-2">Containers Expédiés</div>
              <p className="text-sm text-slate-500">Une expérience prouvée dans la gestion de volumes importants.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[#F97316] mb-2">24h</div>
              <div className="text-xl font-bold text-slate-900 mb-2">Réponse Devis</div>
              <p className="text-sm text-slate-500">Une réactivité maximale pour ne jamais bloquer votre business.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
