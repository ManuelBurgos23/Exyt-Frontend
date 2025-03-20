import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registrar-usuario',
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
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required],
      fecha_nac: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.usuariosService.obtenerUsuarios();
  }

  enviarFormulario() {
    if (this.usuarioForm.invalid) return;

    this.usuariosService.registrarUsuario(this.usuarioForm.value).subscribe(
      () => {
        alert('Usuario registrado correctamente');
        this.usuarioForm.reset();
        this.errores = '';
        this.usuariosService.obtenerUsuarios();
      },
      (error) => {
        console.error("Error en el registro:", error);

        if (error.error && error.error.detail) {
          this.errores =  error.error.detail;
        } else {
          this.errores = 'Error desconocido al registrar usuario.';
        }
      }
    );
  }
}
