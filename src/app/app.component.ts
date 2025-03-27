import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedService } from './services/shared.service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Exyt';
  mostrarLeyenda$!: Observable<boolean>;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.mostrarLeyenda$ = this.sharedService.getMostrarLeyenda();
  }

  logout() {
    this.authService.logout();
  }
}
