import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { RegistrarUsuariosComponent } from './app/components/registrar-usuarios/registrar-usuarios.component';
import { ListarUsuariosComponent } from './app/components/listar-usuarios/listar-usuarios.component';

bootstrapApplication(RegistrarUsuariosComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: 'listar', component: ListarUsuariosComponent },
      { path: 'registrar', component: RegistrarUsuariosComponent },
      { path: '', redirectTo: '/listar', pathMatch: 'full' }
    ])
  ]
});
