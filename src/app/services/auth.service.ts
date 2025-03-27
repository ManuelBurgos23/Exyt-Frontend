import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, Auth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.isAuthenticatedSubject.next(!!user);
    });
  }

  // Login con email y contraseña
  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw error;
    }
  }

  // Login con Google
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log('Usuario autenticado con Google:', result.user);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error en el login con Google:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
      this.isAuthenticatedSubject.next(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isAuthenticated() {
    return this.isAuthenticatedSubject.value;
  }
}
