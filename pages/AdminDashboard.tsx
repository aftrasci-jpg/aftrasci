
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { dbService } from '../services/dbService';
import { Product, Category, PageType } from '../types';
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, LayoutDashboard, 
  Package, LogOut, X, ImageIcon,
  Loader2, Search, Zap, Star, ChevronRight,
  Upload, ImagePlus, CheckCircle2, Layout
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: PageType) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onLogout }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    subcategory: '',
    shortDescription: '',
    detailedDescription: '',
    mainImage: '',
    images: [],
    visible: true,
    featured: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([dbService.getProducts(false), dbService.getCategories()]);
      setProducts(p);
      setCategories(c);
    } catch (err) {
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const parents = useMemo(() => categories.filter(c => !c.parentId), [categories]);
  
  const currentSubcategories = useMemo(() => {
    if (!currentProduct.category) return [];
    const parent = categories.find(c => c.name === currentProduct.category);
    if (!parent) return [];
    return categories.filter(c => c.parentId === parent.id);
  }, [categories, currentProduct.category]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file as File);
      setCurrentProduct(prev => ({ ...prev, mainImage: base64 }));
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      const newImagesBase64 = await Promise.all(files.map(f => fileToBase64(f)));
      setCurrentProduct(prev => ({ 
        ...prev, 
        images: [...(prev.images || []), ...newImagesBase64] 
      }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct.mainImage) {
      alert("Veuillez téléverser l'image principale avant de publier.");
      return;
    }
    
    setIsUploading(true);
    try {
      if (currentProduct.id) {
        await dbService.updateProduct(currentProduct.id, currentProduct);
      } else {
        await dbService.addProduct(currentProduct as any);
      }
      setIsEditing(false);
      await loadData();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      name: '', category: '', subcategory: '', shortDescription: '',
      detailedDescription: '', mainImage: '', images: [], visible: true, featured: false
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer ce produit définitivement ?")) {
      setDeletingId(id);
      try {
        await dbService.deleteProduct(id);
        await loadData();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Impossible de supprimer ce produit.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1E40AF] text-white p-8 hidden lg:flex flex-col border-r border-white/5 h-screen sticky top-0">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Zap size={24} className="text-white fill-current" />
          </div>
          <h2 className="text-2xl font-black tracking-tighter">AFTRAS <span className="text-[#F97316]">PRO</span></h2>
        </div>

        <nav className="flex-grow space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-4 ml-4">Gestion Administrative</p>
          <button className="w-full flex items-center gap-4 px-5 py-4 bg-white/10 rounded-2xl font-bold shadow-xl transition-all">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => onNavigate('catalogue')} className="w-full flex items-center gap-4 px-5 py-4 text-blue-100 hover:text-white hover:bg-white/5 rounded-2xl font-bold transition-all">
            <Package size={20} /> Site Public
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-5 py-4 text-red-100 hover:bg-red-500/10 rounded-2xl font-bold transition-all">
            <LogOut size={20} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par désignation..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-[#F97316] outline-none transition-all text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-sm font-black text-[#1E40AF]">Compte Admin</p>
                <p className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider">AFTRAS CI v2026</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200 overflow-hidden flex items-center justify-center text-[#1E40AF] font-bold">
                AD
              </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
           {loading ? (
             <div className="flex flex-col items-center justify-center py-32 gap-4">
                <Loader2 className="animate-spin text-[#F97316]" size={48} />
                <p className="font-bold text-slate-400">Synchronisation Firestore...</p>
             </div>
           ) : (
             <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-black text-[#1E40AF]">Catalogue de Produits</h2>
                  <p className="text-slate-400 text-sm font-medium">Gérez votre inventaire et vos arrivages.</p>
                </div>
                <button 
                  onClick={() => { resetForm(); setIsEditing(true); }}
                  className="px-6 py-3 bg-[#F97316] text-white rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus size={20} /> Nouveau Produit
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-black uppercase text-slate-400 tracking-widest text-[10px]">Aperçu</th>
                      <th className="px-6 py-4 text-left font-black uppercase text-slate-400 tracking-widest text-[10px]">Désignation</th>
                      <th className="px-6 py-4 text-left font-black uppercase text-slate-400 tracking-widest text-[10px]">Secteur</th>
                      <th className="px-6 py-4 text-left font-black uppercase text-slate-400 tracking-widest text-[10px]">Statut</th>
                      <th className="px-6 py-4 text-right font-black uppercase text-slate-400 tracking-widest text-[10px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <img src={product.mainImage} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">{product.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{product.subcategory || 'Standard'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-50 text-[#1E40AF] rounded-lg font-bold text-[10px] uppercase tracking-tighter border border-blue-100">{product.category}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className={`text-[10px] font-black flex items-center gap-1 ${product.visible ? 'text-green-600' : 'text-slate-400'}`}>
                                {product.visible ? <Eye size={12} /> : <EyeOff size={12} />} {product.visible ? 'PUBLIÉ' : 'BROUILLON'}
                              </span>
                              {product.featured && <span className="text-[10px] font-black text-[#F97316] flex items-center gap-1"><Star size={12} fill="currentColor" /> VEDETTE</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => { setCurrentProduct(product); setIsEditing(true); }} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
                              <button 
                                onClick={() => handleDelete(product.id)} 
                                disabled={deletingId === product.id}
                                className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              >
                                {deletingId === product.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-16 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">
                          La base de données est vide.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
             </div>
           )}
        </div>

        {/* Modal du Formulaire - SCROLLABLE OPTIMIZED */}
        {isEditing && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
             <div className="bg-white rounded-[2.5rem] w-full max-w-5xl shadow-2xl animate-fadeInUp flex flex-col max-h-[90vh]">
                
                {/* Fixed Header */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-[2.5rem] shrink-0">
                  <div>
                    <h2 className="text-2xl font-black text-[#1E40AF]">{currentProduct.id ? 'Modifier le produit' : 'Publier un nouveau produit'}</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Interface de gestion du catalogue</p>
                  </div>
                  <button onClick={() => setIsEditing(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><X size={24} /></button>
                </div>
                
                {/* Scrollable Form Body */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
                  <div className="p-8 space-y-10 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                    <div className="grid lg:grid-cols-2 gap-12">
                      {/* Colonne Gauche : Infos */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Désignation du produit</label>
                          <input required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F97316] font-medium" placeholder="Ex: Groupe Électrogène Cummins 100kVA" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Choix Catégorie</label>
                            <select required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F97316] font-bold text-slate-700" value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value, subcategory: ''})}>
                              <option value="">-- Sélectionner --</option>
                              {parents.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Choix Sous-Catégorie</label>
                            <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F97316] font-bold text-slate-700 disabled:opacity-50" value={currentProduct.subcategory} onChange={e => setCurrentProduct({...currentProduct, subcategory: e.target.value})} disabled={!currentProduct.category || currentSubcategories.length === 0}>
                              <option value="">Par défaut</option>
                              {currentSubcategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* STATUT SECTION */}
                        <div className="space-y-4">
                          <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Statut de publication</label>
                          <div className="grid grid-cols-2 gap-4">
                            <label className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${currentProduct.visible ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                              <input type="checkbox" className="w-5 h-5 accent-green-600" checked={currentProduct.visible} onChange={e => setCurrentProduct({...currentProduct, visible: e.target.checked})} />
                              <div className="flex flex-col">
                                <span className="text-sm font-black uppercase tracking-tighter leading-none">En ligne</span>
                                <span className="text-[10px] font-bold opacity-70">Visible par tous</span>
                              </div>
                            </label>
                            <label className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${currentProduct.featured ? 'bg-orange-50 border-orange-200 text-[#F97316]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                              <input type="checkbox" className="w-5 h-5 accent-orange-500" checked={currentProduct.featured} onChange={e => setCurrentProduct({...currentProduct, featured: e.target.checked})} />
                              <div className="flex flex-col">
                                <span className="text-sm font-black uppercase tracking-tighter leading-none">En Vedette</span>
                                <span className="text-[10px] font-bold opacity-70">Slider d'accueil</span>
                              </div>
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Résumé catalogue (Description courte)</label>
                          <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F97316]" rows={3} placeholder="Détails rapides pour l'aperçu..." value={currentProduct.shortDescription} onChange={e => setCurrentProduct({...currentProduct, shortDescription: e.target.value})} />
                        </div>
                      </div>

                      {/* Colonne Droite : Images */}
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Téléverser Image Principale</label>
                          <div 
                            onClick={() => mainImageInputRef.current?.click()} 
                            className={`w-full h-64 rounded-[2rem] border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group ${currentProduct.mainImage ? 'border-[#F97316]' : 'border-slate-200 hover:border-[#F97316]/30 bg-slate-50'}`}
                          >
                            {currentProduct.mainImage ? (
                              <>
                                <img src={currentProduct.mainImage} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">Remplacer l'image</span>
                                </div>
                              </>
                            ) : (
                              <div className="text-center group-hover:scale-110 transition-transform">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mx-auto mb-3">
                                  <Upload size={32} />
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Choisir un fichier</span>
                              </div>
                            )}
                            <input type="file" hidden accept="image/*" ref={mainImageInputRef} onChange={handleMainImageUpload} />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Galerie Photos Secondaires</label>
                            <button type="button" onClick={() => galleryInputRef.current?.click()} className="text-[10px] font-black text-[#1E40AF] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1.5 hover:bg-blue-100">
                              <ImagePlus size={14} /> + AJOUTER
                            </button>
                            <input type="file" hidden multiple accept="image/*" ref={galleryInputRef} onChange={handleGalleryUpload} />
                          </div>
                          <div className="grid grid-cols-4 gap-3 p-4 bg-slate-50 rounded-[2rem] border border-slate-100 min-h-[116px]">
                            {currentProduct.images?.length === 0 && <p className="col-span-4 text-[10px] text-slate-300 font-bold uppercase text-center mt-6">Aucun visuel additionnel</p>}
                            {currentProduct.images?.map((img, idx) => (
                              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                                <img src={img} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 shadow-lg"><X size={10} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Fiche Technique Complète (Description détaillée)</label>
                      <textarea rows={6} className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none focus:ring-2 focus:ring-[#F97316] font-medium leading-relaxed" placeholder="Spécifications, dimensions, origine, garantie..." value={currentProduct.detailedDescription} onChange={e => setCurrentProduct({...currentProduct, detailedDescription: e.target.value})} />
                    </div>
                  </div>

                  {/* Fixed Footer with Action Buttons */}
                  <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-[2.5rem] flex justify-end gap-4 shrink-0">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-4 bg-white border border-slate-200 text-slate-500 font-black rounded-2xl hover:bg-slate-50 transition-colors">FERMER</button>
                    <button 
                      type="submit" 
                      disabled={isUploading} 
                      className="px-10 py-4 bg-[#1E40AF] text-white font-black rounded-2xl flex items-center gap-3 shadow-xl disabled:opacity-50 hover:bg-[#F97316] transition-all"
                    >
                      {isUploading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                      {currentProduct.id ? 'ENREGISTRER LES MODIFICATIONS' : 'PUBLIER MAINTENANT'}
                    </button>
                  </div>
                </form>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};
