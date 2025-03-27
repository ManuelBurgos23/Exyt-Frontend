import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { SharedService } from '../../services/shared.service';
import { espaciosEnBlanco } from '../../validators/espaciosEnBlanco.validator';
import { NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';

initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading = true;

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private ngZone: NgZone,
    private authService: AuthService

  ) {
    this.sharedService.setMostrarLeyenda(false);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, espaciosEnBlanco()]],
      password: ['', [Validators.required, espaciosEnBlanco()]],
    });
  }



  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.ngZone.run(() => {
        if (user) {
          this.router.navigate(['/usuarios']);
        } else {
          this.isLoading = false;
        }
      });
    });
  }

  ngOnDestroy() {
    this.sharedService.setMostrarLeyenda(true);
  }

  login() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/usuarios']);
      })
      .catch((error) => {

        if (error.code === 'auth/wrong-password') {
          this.errorMessage = 'Contraseña incorrecta. Inténtalo nuevamente.';
        } else if (error.code === 'auth/user-not-found') {
          this.errorMessage = 'No se encuentra un usuario con ese correo electrónico.';
        } else {
          this.errorMessage = 'Email o contraseña incorrectos.';
        }
      });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => console.log('Inicio de sesión con Google exitoso'))
      .catch(err => console.error('Error en Google Sign-In:', err));
  }

}
