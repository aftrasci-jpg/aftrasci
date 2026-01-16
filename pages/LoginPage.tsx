
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Lock, User, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { PageType } from '../types';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigate: (page: PageType) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('admin@aftras.ci');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/network-request-failed') {
        setError('Erreur réseau : vérifiez votre connexion ou les restrictions navigateur.');
      } else {
        setError('Identifiants incorrects ou erreur serveur.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img 
            src={LOGO_URL} 
            alt="AFTRAS CI" 
            className="h-20 mx-auto mb-6 cursor-pointer"
            onClick={() => onNavigate('home')}
          />
          <h1 className="text-2xl font-bold text-[#1E40AF]">Espace Administration</h1>
          <p className="text-slate-500 mt-2">Authentification sécurisée Firebase</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Admin</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F97316] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-[#F97316] outline-none transition-all ${
                    error ? 'border-red-500 animate-shake' : 'border-slate-200'
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-xs font-bold mt-2">{error}</p>}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E40AF] text-white font-bold py-4 rounded-xl hover:bg-[#122e85] transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Se connecter'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
            <ShieldCheck size={14} className="text-[#F97316]" /> Données protégées par Firebase Auth
          </div>
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="w-full mt-6 text-slate-500 hover:text-[#F97316] font-bold transition-colors text-sm"
        >
          Retour au site public
        </button>
      </div>
    </div>
  );
};
