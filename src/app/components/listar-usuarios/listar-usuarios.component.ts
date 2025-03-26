import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OnInit, Component, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  mensajeError: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios;
        if (usuarios.length === 0) {
          this.mensajeError = 'No hay usuarios registrados.';
        }
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error al obtener usuarios:', error);
        this.mensajeError = 'No se pudo cargar la lista de usuarios.';
      }
    );
  }
}
