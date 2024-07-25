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

  ngOnInit(){
    this.canActivate()
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // if (this.authService.isTokenExpired()) {
    //   Swal.fire({
    //     icon: 'info',
    //     title: 'Sua sessão expirou',
    //     text: 'Por favor, faça o login novamente',
    //   });
    // }

    this.router.navigate(['/login']);
    return false;
  }

}
