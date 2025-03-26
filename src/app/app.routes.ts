import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { RegistrarUsuariosComponent } from './components/registrar-usuarios/registrar-usuarios.component';
import { LectorQrComponent } from './components/lector-qr/lector-qr.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

// Definir rutas de la aplicación
export const routes: Routes = [
  { path: 'usuarios', component: ListarUsuariosComponent, data: { mostrarLeyenda: true }, canActivate: [AuthGuard] },
  { path: 'registrar', component: RegistrarUsuariosComponent, data: { mostrarLeyenda: true } , canActivate: [AuthGuard]},
  { path: 'lector-qr', component: LectorQrComponent, data: { mostrarLeyenda: true }, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { mostrarLeyenda: false } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
