import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { Department } from '../../model/department.model';
import { Role } from '../../model/role.model';

@Injectable({
  providedIn: 'root',

})
export class EmployeeListService {

  constructor(
    private http: HttpClient
  ) { }

  api = environment.apiURI


  allUsers(): Observable<Employee[]>{
    return this.http.get<any>(`${this.api}/users`)
  }

  userById(id: number): Observable<Employee>{
    return this.http.get<any>(`${this.api}/users/${id}`)
  }

  updateUser(body: any, id: number){
    return this.http.put<any>(`${this.api}/users/${id}`, body)
  }

  allRoles(): Observable<Role[]>{
    return this.http.get<any>(`${this.api}/role`)
  }

  deleteEmployee(id: number){
    return this.http.delete<any>(`${this.api}/users/${id}`)
  }
}
