import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedService } from './services/shared.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exyt';
  mostrarLeyenda$!: Observable<boolean>;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.mostrarLeyenda$ = this.sharedService.getMostrarLeyenda();
  }
}
