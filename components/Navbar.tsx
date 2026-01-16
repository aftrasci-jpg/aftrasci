
import React, { useState } from 'react';
import { Menu, X, Phone, Mail, Globe, MessageCircle, ChevronRight } from 'lucide-react';
import { PageType } from '../types';
import { LOGO_URL } from '../constants';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { label: string; id: PageType }[] = [
    { label: 'Accueil', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Catalogue', id: 'catalogue' },
    { label: 'À Propos', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleMobileNavigate = (page: PageType) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top Bar - Brand Blue Theme */}
      <div className="hidden md:block bg-[#1E40AF] text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <a 
              href="https://wa.me/2250141354860" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F97316] transition-colors"
            >
              <MessageCircle size={14} className="text-[#F97316]" /> 
              WhatsApp: +225 0141354860
            </a>
            <a 
              href="mailto:aftrasci@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#F97316] transition-colors"
            >
              <Mail size={14} className="text-[#F97316]" /> 
              aftrasci@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe size={14} className="text-[#F97316]" /> 
            Chine • Inde • Côte d'Ivoire
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img 
              src={LOGO_URL} 
              alt="Africa Trading Solutions" 
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-heading font-black tracking-tighter text-[#1E40AF] ml-2 block md:hidden lg:block">
              AFTRAS <span className="text-[#F97316]">CI</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-semibold transition-colors uppercase tracking-wider ${
                  currentPage === link.id 
                    ? 'text-[#F97316] border-b-2 border-[#F97316]' 
                    : 'text-slate-600 hover:text-[#F97316]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-[#F97316] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#ea580c] transition-all shadow-md"
            >
              DEVIS RAPIDE
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[#1E40AF] p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl transition-all duration-300 origin-top ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleMobileNavigate(link.id)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl font-bold transition-all ${
                currentPage === link.id 
                  ? 'bg-orange-50 text-[#F97316]' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="uppercase tracking-widest text-sm">{link.label}</span>
              <ChevronRight size={18} className={currentPage === link.id ? 'opacity-100' : 'opacity-20'} />
            </button>
          ))}
          
          <div className="pt-6 border-t border-slate-100 mt-4 space-y-4">
            <button 
              onClick={() => handleMobileNavigate('contact')}
              className="w-full bg-[#F97316] text-white py-4 rounded-2xl font-black text-center shadow-lg active:scale-95 transition-transform"
            >
              DEMANDER UN DEVIS
            </button>
            
            <div className="flex flex-col items-center gap-3 pt-4 text-slate-400">
               <div className="flex gap-6">
                <a href="https://wa.me/2250141354860" className="flex items-center gap-2 font-bold text-xs">
                  <MessageCircle size={16} className="text-green-500" /> WhatsApp
                </a>
                <a href="mailto:aftrasci@gmail.com" className="flex items-center gap-2 font-bold text-xs">
                  <Mail size={16} className="text-orange-500" /> Email
                </a>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">Abidjan • Chine • Inde</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
