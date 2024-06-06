import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocsListService {

  constructor(private http: HttpClient) { }


  ngOnInit(){}


  api = environment.apiURI

  getDocs(){
    return this.http.get<any>(`${this.api}/pdf`)
  }

  downloadDoc(filename: string): Observable<Blob> {
    return this.http.get(`${this.api}/pdf/${filename}`, { responseType: 'blob' });
  }





}
