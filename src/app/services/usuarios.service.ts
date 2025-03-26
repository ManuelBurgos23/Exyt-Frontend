import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'https://exyt-backend-173338291918.europe-southwest1.run.app';

  private usuariosSubject = new BehaviorSubject<any[]>([]);
  usuarios$ = this.usuariosSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`).pipe(
      tap((usuarios) => {
        this.usuariosSubject.next(usuarios);
      })
    );
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, usuario).pipe(
      tap((nuevoUsuario) => {
        const usuariosActuales = this.usuariosSubject.value;
        this.usuariosSubject.next([...usuariosActuales, nuevoUsuario]);
      })
    );
  }
}
