import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Department } from '../../../model/department.model';

@Injectable({
  providedIn: 'root',

})
export class DepartmentService {
  api = environment.apiURI

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(){}


  allDepartments(){}

  newDepartment(department: any): Observable<any> {
    return this.http.post<any>(` http://localhost:3000/departments`, department);
  }

  allDepartment(){
    return this.http.get<any>(`${this.api}/departments`);
  }

}
