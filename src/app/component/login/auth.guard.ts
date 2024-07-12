// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else if (this.authService.isTokenExpired()) {
      Swal.fire({
        icon: 'info',
        title: 'Sua sessão expirou',
        text: 'Por favor, faça o login novamente',
      });
      this.router.navigate(['/login']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
