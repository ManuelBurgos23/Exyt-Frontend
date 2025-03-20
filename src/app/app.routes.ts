import { Routes } from '@angular/router';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { RegistrarUsuariosComponent } from './components/registrar-usuarios/registrar-usuarios.component';

export const routes: Routes = [
  { path: 'usuarios', component: ListarUsuariosComponent },
  { path: 'registrar', component: RegistrarUsuariosComponent },
];
