import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private mostrarLeyendaSubject = new BehaviorSubject<boolean>(false);

  setMostrarLeyenda(valor: boolean) {
    this.mostrarLeyendaSubject.next(valor);
  }

  getMostrarLeyenda() {
    return this.mostrarLeyendaSubject.asObservable();
  }
}
