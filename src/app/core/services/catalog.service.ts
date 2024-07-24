import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsDto } from '../../model/items.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient
  ) { }


  api = 'https://portalcooperado.insumosholambra.com.br/api/catalog/products'
  // newEmployee(user: any): Observable<any> {
  //   return this.http.post<any>(`${this.api}/users`, user);
  // }




  findDefensivos(){
    return this.http.get<ItemsDto[]>(`${this.api}/defensivos`)
  }


  findFertilizantes(){
    return this.http.get<ItemsDto[]>(`${this.api}/fertilizantes`)
  }

  getEmbalagens(){
    return this.http.get<ItemsDto[]>(`${this.api}/embalagens`)
  }
  findDiversos(){
    return this.http.get<ItemsDto[]>(`${this.api}/diversos`)
  }
  findPLasticosetelas(){
    return this.http.get<ItemsDto[]>(`${this.api}/plasticosetelas`)
  }
  findBiologicos(){
    return this.http.get<ItemsDto[]>(`${this.api}/biologicos`)
  }
}
