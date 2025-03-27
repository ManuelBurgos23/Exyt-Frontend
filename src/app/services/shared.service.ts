import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private mostrarLeyendaSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  setMostrarLeyenda(valor: boolean) {
    this.mostrarLeyendaSubject.next(valor);
  }

  getMostrarLeyenda(): Observable<boolean> {
    return this.mostrarLeyendaSubject.asObservable();
  }
}
