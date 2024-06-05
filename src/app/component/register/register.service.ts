import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  api = environment.apiURI


  newEmployee(user: any): Observable<any> {
    return this.http.post<any>(`${this.api}/users`, user);
  }
}
