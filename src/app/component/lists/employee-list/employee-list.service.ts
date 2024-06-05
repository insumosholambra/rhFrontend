import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../../model/employee.model';

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

  allRoles(): Observable<Employee[]>{
    return this.http.get<any>(`${this.api}/role`)
  }
}
