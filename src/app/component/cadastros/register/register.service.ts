import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../../model/department.model';

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

  allDepartments(): Observable<Department[]>{
    return this.http.get<any>(`${this.api}/departments`)
  }

  getStates(): Observable<any>{
    return this.http.get<any>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  }

}
