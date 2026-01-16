
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalogue } from './pages/Catalogue';
import { ProductDetail } from './pages/ProductDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { Services } from './pages/Services';
import { LoginPage } from './pages/LoginPage';
import { PageType } from './types';
import { 
  MessageCircle, Mail, MapPin, Send, 
  Target, Eye, Award, Globe2, Ship, 
  ShieldCheck, TrendingUp, Users2, ChevronRight, Zap,
  Briefcase
} from 'lucide-react';

// Simple Router
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();
  const [isAdmin, setIsAdmin] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Demande de devis',
    message: ''
  });

  const handleNavigate = (page: PageType, productId?: string) => {
    setCurrentPage(page);
    setSelectedProductId(productId);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setCurrentPage('admin-dashboard');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "2250141354860";
    const formattedMessage = `*Nouveau message de contact - AFTRAS CI*\n\n*Nom:* ${contactForm.name}\n*Email:* ${contactForm.email}\n*Sujet:* ${contactForm.subject}\n*Message:* ${contactForm.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`, '_blank');
    alert('Votre message a été généré. Vous allez être redirigé vers WhatsApp.');
    setContactForm({ name: '', email: '', subject: 'Demande de devis', message: '' });
  };

  const renderPage = () => {
    if (isAdmin && currentPage === 'admin-dashboard') {
      return (
        <AdminDashboard 
          onNavigate={handleNavigate} 
          onLogout={() => { setIsAdmin(false); setCurrentPage('home'); }} 
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'catalogue':
        return <Catalogue onNavigate={handleNavigate} />;
      case 'product-detail':
        return selectedProductId ? (
          <ProductDetail productId={selectedProductId} onNavigate={handleNavigate} />
        ) : (
          <Catalogue onNavigate={handleNavigate} />
        );
      case 'services':
        return <Services onNavigate={handleNavigate} />;
      case 'admin-login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
      case 'about':
        return (
          <div className="bg-white overflow-hidden">
            {/* Header Hero Modernisé */}
            <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-blue-100/30 blur-[150px] rounded-full -z-10 animate-pulse"></div>
              
              <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-[#F97316] rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                    <Zap size={14} className="fill-current" /> Notre Engagement 2026
                  </div>
                  <h1 className="text-4xl md:text-6xl font-heading font-black text-[#001E3C]">
                    L'Excellence <span className="text-[#F97316]">Sans Frontières</span>
                  </h1>
                </div>

                {/* IMAGE HERO */}
                <div className="relative group animate-fadeInUp">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#1E40AF] to-[#F97316] rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-2xl border border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1600" 
                      alt="Vision Logistique AFTRAS CI" 
                      className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E40AF]/90 via-transparent to-transparent flex items-end p-8 md:p-16">
                      <div className="max-w-2xl space-y-4">
                        <h3 className="text-2xl md:text-4xl font-bold text-white font-heading">Connecter les continents.</h3>
                        <p className="text-slate-200 text-sm md:text-lg font-medium opacity-90">
                          Nous bâtissons l'infrastructure immatérielle qui permet aux entrepreneurs d'Afrique d'accéder aux centres de production mondiaux.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Stats elements */}
                  <div className="absolute -bottom-6 -right-6 hidden lg:flex bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 items-center gap-4 animate-bounce-slow">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-[#F97316]">
                      <Globe2 size={24} />
                    </div>
                    <div>
                      <p className="text-xl font-black text-[#1E40AF]">24/7</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Suivi Global</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission & Vision Cards */}
            <section className="max-w-7xl mx-auto px-4 py-24">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group p-10 bg-[#1E40AF] rounded-[3rem] text-white space-y-6 hover:translate-y-[-8px] transition-all duration-500 shadow-xl shadow-blue-900/20">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-[#F97316] group-hover:scale-110 transition-transform">
                    <Target size={32} />
                  </div>
                  <h2 className="text-3xl font-bold font-heading">Notre Mission</h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Démocratiser l'accès aux marchés mondiaux pour les entreprises africaines. Nous gérons la complexité logistique pour vous laisser vous concentrer sur votre croissance.
                  </p>
                  <ul className="space-y-3 pt-4">
                    {['Sourcing sécurisé', 'Logistique transparente', 'Coûts optimisés'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                        <ChevronRight size={16} className="text-[#F97316]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-2xl space-y-6 hover:translate-y-[-8px] transition-all duration-500">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-[#F97316] group-hover:scale-110 transition-transform">
                    <Eye size={32} />
                  </div>
                  <h2 className="text-3xl font-bold font-heading text-[#1E40AF]">Notre Vision</h2>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    Devenir le leader panafricain des solutions de "Trading Logistique", reconnu pour notre fiabilité sans faille et notre impact positif sur l'économie locale.
                  </p>
                   <div className="pt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-center">
                      <p className="text-2xl font-black text-[#1E40AF]">2030</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Horizon Leader</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-center">
                      <p className="text-2xl font-black text-[#F97316]">15+</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Pays Cibles</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Values - Modern Grid */}
            <section className="bg-slate-50 py-24">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-sm font-black text-[#F97316] uppercase tracking-[0.3em]">ADN AFTRAS</h2>
                  <h3 className="text-4xl font-heading font-black text-[#1E40AF]">Les valeurs qui nous animent</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: <ShieldCheck size={32} />, title: "Fiabilité", text: "Nous traitons chaque colis comme s'il était le nôtre, avec une rigueur absolue." },
                    { icon: <Globe2 size={32} />, title: "Transparence", text: "Pas de surprises. Vous savez exactement où se trouve votre marchandise et à quel coût." },
                    { icon: <TrendingUp size={32} />, title: "Performance", text: "Nous cherchons sans cesse les routes les plus courtes et les tarifs les plus justes." },
                    { icon: <Users2 size={32} />, title: "Équipe experte", text: "Nos agents regorgent de grandes expériences et de professionnalisme dans le commerce sino-africain" },
                  ].map((value, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-xl transition-all duration-300 group">
                      <div className={`w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300`}>
                        {value.icon}
                      </div>
                      <h4 className="text-xl font-bold text-[#1E40AF] mb-4">{value.title}</h4>
                      <p className="text-slate-500 leading-relaxed text-sm">{value.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="pb-24 px-4 text-center">
              <div className="max-w-2xl mx-auto space-y-8">
                <h3 className="text-3xl font-heading font-bold text-[#1E40AF]">Prêt à collaborer avec nous ?</h3>
                <button 
                  onClick={() => handleNavigate('contact')}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-[#F97316] text-white font-black rounded-2xl shadow-2xl shadow-orange-800/30 hover:scale-105 active:scale-95 transition-all"
                >
                  Démarrer un projet <ChevronRight />
                </button>
              </div>
            </section>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h1 className="text-5xl font-heading font-black text-[#1E40AF]">Contactez-nous</h1>
              <p className="text-lg text-slate-600">Une question ? Un projet d'importation ? Notre équipe vous répond en moins de 24h.</p>
              
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl group hover:border-[#F97316] transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-100 p-3 rounded-2xl text-[#F97316]">
                      <MessageCircle size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#1E40AF]">WhatsApp Business</h3>
                      <p className="text-slate-500 text-sm">Réponse instantanée</p>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-[#1E40AF] mb-6">+225 0141354860</p>
                  <a 
                    href="https://wa.me/2250141354860" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#F97316] text-white font-bold py-4 rounded-xl hover:bg-[#ea580c] transition-all shadow-lg active:scale-95"
                  >
                    <MessageCircle size={20} /> Démarrer une discussion
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <Mail className="text-[#F97316] mb-3" size={24} />
                    <h3 className="font-bold text-[#1E40AF] mb-1">Email Direct</h3>
                    <a href="mailto:aftrasci@gmail.com" className="text-slate-600 hover:text-[#F97316] transition-colors font-medium break-all text-sm">aftrasci@gmail.com</a>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <MapPin className="text-[#F97316] mb-3" size={24} />
                    <h3 className="font-bold text-[#1E40AF] mb-1">Bureau</h3>
                    <p className="text-slate-600 font-medium text-sm">Abidjan, Côte d'Ivoire<br/>Yopougon Niangon Academie fin goudron cité Sodefor</p>
                  </div>
                </div>
              </div>
            </div>

            <form 
              className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 space-y-6" 
              onSubmit={handleContactSubmit}
            >
              <h2 className="text-2xl font-bold text-[#1E40AF] mb-4">Envoyez-nous un message</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nom Complet</label>
                  <input 
                    required 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none" 
                    placeholder="Jean Dupont"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none" 
                    placeholder="jean@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Sujet</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                >
                  <option>Demande de devis</option>
                  <option>Sourcing Chine/Inde</option>
                  <option>Suivi de colis</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea 
                  required 
                  rows={4} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none" 
                  placeholder="Détails de votre demande..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#F97316] text-white font-bold py-4 rounded-xl hover:bg-[#ea580c] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} /> Envoyer via WhatsApp
              </button>
            </form>
          </div>
        );
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentPage !== 'admin-dashboard' && currentPage !== 'admin-login' && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {currentPage !== 'admin-dashboard' && currentPage !== 'admin-login' && (
        <Footer onNavigate={handleNavigate} />
      )}
      
      {/* Floating WhatsApp Button */}
      {currentPage !== 'admin-dashboard' && currentPage !== 'admin-login' && (
        <a 
          href="https://wa.me/2250141354860" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-[#F97316] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90 flex items-center justify-center"
        >
          <MessageCircle size={32} />
        </a>
      )}
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;
