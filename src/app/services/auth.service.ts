import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
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
      if (user) {
        this.isAuthenticatedSubject.next(true); // Usuario autenticado
      } else {
        this.isAuthenticatedSubject.next(false); // Usuario no autenticado
      }
    });
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/']); // Redirige a la página principal
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
      this.isAuthenticatedSubject.next(false); // Actualiza el estado de autenticación
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isAuthenticated() {
    return this.isAuthenticatedSubject.value;
  }
}
