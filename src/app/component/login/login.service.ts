import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  api = environment.apiURI


  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/login`, user);
  }
}
