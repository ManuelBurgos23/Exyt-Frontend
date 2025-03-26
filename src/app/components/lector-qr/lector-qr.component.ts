import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lector-qr',
  standalone: true,
  imports: [CommonModule, NgxScannerQrcodeComponent],
  templateUrl: './lector-qr.component.html',
  styleUrls: ['./lector-qr.component.css']
})
export class LectorQrComponent {
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  onScanSuccess(event: any): void {
    const qrData = event as string;

    console.log('QR Escaneado:', qrData);

    try {
      const usuario = JSON.parse(qrData);
      this.identificarQR(usuario);
    } catch (error) {
      console.error('Error al procesar los datos del QR:', error);
    }
  }


  onScanError(error: any): void {
    console.error('Error al escanear QR:', error);
  }

  identificarQR(usuario: any): void {
    this.http.post('http://localhost:8000/registrar', usuario)
      .subscribe({
        next: (response) => {
          this.mensaje = 'Usuario registrado correctamente';
          console.log(response);
        },
        error: (error) => {
          this.mensaje = `Error: ${error.error.detail}`;
          console.error('Error al registrar el usuario:', error);
        }
      });
  }
}
