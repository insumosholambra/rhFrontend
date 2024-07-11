import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { VacationRequest } from '../../model/vacation-request.model';

@Injectable({
  providedIn: 'root'
})
export class NewVacationService {

  constructor(private http: HttpClient) { }


  ngOnInit(){}


  api = environment.apiURI



  sendRequestVacation(request: string): Observable<any> {
    return this.http.post(`${this.api}/vacation-requests`, request);
  }

  getRequestVacationByIdEmployee(id: number): Observable<VacationRequest[]>{
    return this.http.get<VacationRequest[]>(`${this.api}/vacation-requests/${id}`);

  }





}
