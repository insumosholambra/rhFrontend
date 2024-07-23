import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Visit } from '../../model/visit.model';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(
    private http: HttpClient
  ) { }

  api = environment.apiURI

  // newEmployee(user: any): Observable<any> {
  //   return this.http.post<any>(`${this.api}/users`, user);
  // }

  newVisit(visit: any): Observable<any>{
    return this.http.post<any>(`${this.api}/visit`, visit)
  }

  getAllVisits(): Observable<Visit[]>{
    return this.http.get<any>(`${this.api}/visit`)
  }

  getVisitsByUser(id: number): Observable<Visit>{
    return this.http.get<any>(`${this.api}/visit/${id}`)
  }

  getVisitsById(id: number): Observable<Visit[]>{
    return this.http.get<any>(`${this.api}/visit/all-visits/${id}`)
  }
}
