import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { RegistrarUsuariosComponent } from './components/registrar-usuarios/registrar-usuarios.component';

const routes: Routes = [
  { path: 'usuarios', component: ListarUsuariosComponent },
  { path: 'registrar', component: RegistrarUsuariosComponent },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    RegistrarUsuariosComponent,
    ListarUsuariosComponent,
    provideHttpClient(withFetch()),
  ],
};
