import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environment/environment';



@Injectable({
  providedIn: 'root',

})
export class HolidayRequestService {


  constructor(
    private http: HttpClient
  ) { }


  api = environment.apiURI

  getRequests(){
    return this.http.get<any>(`${this.api}/vacation`)
  }
}
