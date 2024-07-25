import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Department } from '../../model/department.model';
import { Employee } from '../../model/employee.model';

@Injectable({
  providedIn: 'root',

})
export class UserService {


  constructor(
    private http: HttpClient
  ) { }

  api = environment.apiURI

  getUserData(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.api}/users/${id}`);
  }

  getUserPhoto(id: number): Observable<Blob> {
    return this.http.get(`${this.api}/users/${id}/photo`, { responseType: 'blob' });
  }


  newEmployee(user: any): Observable<any> {
    return this.http.post<any>(`${this.api}/users`, user);
  }

  allDepartments(): Observable<Department[]>{
    return this.http.get<any>(`${this.api}/departments`)
  }

  getStates(): Observable<any>{
    return this.http.get<any>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  }

  getUserNames() {
    return this.http.get<Employee>(`${this.api}/users`);
  }

}
