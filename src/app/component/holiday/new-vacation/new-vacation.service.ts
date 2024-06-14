import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

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





}
