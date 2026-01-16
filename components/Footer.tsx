
import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Send, MessageCircle, Lock } from 'lucide-react';
import { PageType } from '../types';
import { LOGO_URL } from '../constants';

export const Footer: React.FC<{onNavigate: (page: PageType) => void}> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1E40AF] text-blue-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src={LOGO_URL} alt="Africa Trading Solutions" className="h-12 w-auto brightness-0 invert" />
          </div>
          <p className="text-sm leading-relaxed opacity-90">
            Africa Trading Solutions Côte d'Ivoire : Votre pont commercial de confiance entre l'Asie et l'Afrique. Nous simplifions vos importations avec expertise et transparence.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-orange-600 transition-colors text-white"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-orange-600 transition-colors text-white"><Instagram size={18} /></a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-orange-600 transition-colors text-white"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-orange-500 pl-3">Navigation</h3>
          <ul className="space-y-3">
            <li><button onClick={() => onNavigate('home')} className="hover:text-orange-400 transition-colors text-left">Accueil</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-orange-400 transition-colors text-left">Nos Services</button></li>
            <li><button onClick={() => onNavigate('catalogue')} className="hover:text-orange-400 transition-colors text-left">Produits</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-orange-400 transition-colors text-left">À Propos</button></li>
            <li className="pt-4 border-t border-white/10 mt-4">
              <button 
                onClick={() => onNavigate('admin-login')} 
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-orange-400 transition-all"
              >
                <Lock size={12} /> Espace Admin
              </button>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-white pl-3">Contactez-nous</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-orange-400 shrink-0" />
              <span className="text-sm">Abidjan, Côte d'Ivoire<br/>Yopougon Niangon Academie fin goudron cité Sodefor</span>
            </li>
            <li className="flex items-center gap-3">
              <a href="https://wa.me/2250141354860" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-300 transition-colors">
                <MessageCircle size={20} className="text-green-400 shrink-0" />
                <span className="text-sm">+225 0141354860</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a href="mailto:aftrasci@gmail.com" className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                <Mail size={20} className="text-orange-400 shrink-0" />
                <span className="text-sm">aftrasci@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-orange-500 pl-3">Actualités</h3>
          <p className="text-sm mb-4">Recevez nos offres et arrivages hebdomadaires.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="bg-white/10 border border-white/20 px-4 py-2 rounded-l-md w-full focus:outline-none focus:border-orange-500 placeholder-blue-200"
            />
            <button className="bg-orange-600 text-white px-3 rounded-r-md hover:bg-orange-700 transition-colors">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center gap-4 text-xs opacity-70">
        <p>© 2026 Africa Trading Solutions Côte d'Ivoire (AFTRAS CI). Tous droits réservés.</p>
      </div>
    </footer>
  );
};
