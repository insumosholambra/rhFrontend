import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ListRoleService {

  constructor(
    private http: HttpClient
  ) { }

  api = environment.apiURI


  getAllRoles(){
    return this.http.get<any>(`${this.api}/role`)
  }



}
