import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../../model/role.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',

})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }

  api = environment.apiURI


  newRole(role: any) {

    return this.http.post(`${this.api}/role`, role)
      .subscribe(
        response => {
          console.log('Resposta do servidor:', response);
          Swal.fire({
            title: 'Cargo inserido com sucesso',
            confirmButtonText: 'Ok'
          })
        },
        error => {
          console.error('Erro na requisição:', error);
        }
      );
  }


  getAllRoles(): Observable<Role>{
    return this.http.get<any>(`${this.api}/role`)
  }
}
