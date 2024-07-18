import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;
  private helper = new JwtHelperService();



  constructor(){
    this.token = localStorage.getItem('token'); // Carregar o token do localStorage
    this.getUserInfo()
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token
  }

  // Função para decodificar o token
  decodeToken() {
    if (this.token) {
      try {
        const decodedToken = this.helper.decodeToken(this.token);
        return {
          name: decodedToken.username,
          subname: decodedToken.subname,
          cargo: decodedToken.cargo.DESCRICAO,
          id: decodedToken.id,
          departamento: decodedToken.departamento.DESCRICAO
        };
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
      }
    }
    return null;
  }


  // Função para obter informações do usuário
  getUserInfo(): any {
    const decodedToken = this.decodeToken();
    return decodedToken; // Retorna o payload decodificado do token
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
function jwtDecode(token: string): any {
  throw new Error('Function not implemented.');
}

