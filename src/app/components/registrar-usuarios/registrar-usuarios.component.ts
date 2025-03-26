import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuarios.service';
import { espaciosEnBlanco } from '../../validators/espaciosEnBlanco.validator';

@Component({
  selector: 'app-registrar-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css'],
  providers: [UsuarioService],
})
export class RegistrarUsuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  errores: string = '';

  constructor(private fb: FormBuilder, private usuariosService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, espaciosEnBlanco()]],
      apellidos: ['', [Validators.required, espaciosEnBlanco()]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, espaciosEnBlanco()]],
      fecha_nac: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.usuariosService.obtenerUsuarios().subscribe();
  }

  limpiarEspacios() {
    Object.keys(this.usuarioForm.controls).forEach(key => {
      const control = this.usuarioForm.get(key);
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim(), { emitEvent: false });
      }
    });
  }

  enviarFormulario() {
    this.limpiarEspacios(); // Limpia espacios en blanco antes de enviar

    if (this.usuarioForm.invalid) return;

    this.usuariosService.registrarUsuario(this.usuarioForm.value).subscribe(
      () => {
        alert('Usuario registrado correctamente');
        this.usuarioForm.reset();
        this.errores = '';
      },
      (error) => {
        if (error.status === 400 && error.error && error.error.detail) {
          this.errores = error.error.detail; // mensaje detallado de error
        } else {
          this.errores = 'Hubo un problema al registrar el usuario. Por favor, introduzca sus datos correctamente.';
        }
      }
    );
  }
}
