import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;



  constructor(){
    this.token = localStorage.getItem('token'); // Carregar o token do localStorage
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isTokenExpired(): boolean {
    if (!this.token) {
      return true;
    }

    const payload = JSON.parse(atob(this.token.split('.')[1]));
    const expiration = payload.exp * 1000; // Convertendo para milissegundos
    return Date.now() >= expiration; // Verifica se o token está expirado
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token'); // Remover o token do localStorage
  }
}
