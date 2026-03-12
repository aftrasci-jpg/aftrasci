import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AdminUser {
  uid: string;
  email: string;
  isAdmin: boolean;
  lastLogin: number;
}

class AuthService {
  private currentUser: AdminUser | null = null;
  private authListeners: ((user: AdminUser | null) => void)[] = [];

  constructor() {
    // Écouter les changements d'authentification
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const adminUser = await this.validateAdminUser(firebaseUser);
          this.currentUser = adminUser;
          this.notifyAuthListeners();
        } catch (error) {
          console.error('Auth validation failed:', error);
          this.currentUser = null;
          this.notifyAuthListeners();
        }
      } else {
        this.currentUser = null;
        this.notifyAuthListeners();
      }
    });
  }

  // Validation du rôle admin via custom claims Firebase
  private async validateAdminUser(firebaseUser: User): Promise<AdminUser> {
    // Rafraîchir les tokens pour obtenir les claims à jour
    await firebaseUser.getIdTokenResult(true);
    
    const idTokenResult = await firebaseUser.getIdTokenResult();
    const isAdmin = idTokenResult.claims.admin === true;

    if (!isAdmin) {
      throw new Error('Accès refusé: utilisateur non administrateur');
    }

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      isAdmin: true,
      lastLogin: Date.now()
    };
  }

  // S'abonner aux changements d'état d'authentification
  onAuthChange(callback: (user: AdminUser | null) => void): () => void {
    this.authListeners.push(callback);
    
    // Retourner une fonction pour se désabonner
    return () => {
      this.authListeners = this.authListeners.filter(listener => listener !== callback);
    };
  }

  // Notifier les listeners du changement d'état
  private notifyAuthListeners(): void {
    this.authListeners.forEach(listener => listener(this.currentUser));
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): AdminUser | null {
    return this.currentUser;
  }

  // Vérifier si l'utilisateur est authentifié et admin
  isAdminAuthenticated(): boolean {
    return this.currentUser !== null && this.currentUser.isAdmin;
  }

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await auth.signOut();
      this.currentUser = null;
      this.notifyAuthListeners();
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  }

  // Vérification de sécurité renforcée
  async verifyAdminAccess(): Promise<boolean> {
    if (!this.currentUser) {
      return false;
    }

    try {
      // Rafraîchir les claims pour s'assurer que les permissions sont à jour
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return false;
      }

      await currentUser.getIdTokenResult(true);
      const idTokenResult = await currentUser.getIdTokenResult();
      
      return idTokenResult.claims.admin === true;
    } catch (error) {
      console.error('Admin verification failed:', error);
      return false;
    }
  }
}

// Exporter une instance unique du service
export const authService = new AuthService();

// Fonctions utilitaires pour une utilisation facile dans les composants
export const useAdminAuth = () => {
  return {
    currentUser: authService.getCurrentUser(),
    isAdmin: authService.isAdminAuthenticated(),
    verifyAccess: () => authService.verifyAdminAccess(),
    logout: () => authService.logout()
  };
};