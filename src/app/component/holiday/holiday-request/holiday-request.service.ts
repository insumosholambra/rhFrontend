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
    return this.http.get<any>(`${this.api}/vacation-requests`)
  }

  approveRequest(id: number, status: string) {
    const body = { STATUS_SOLICITACAO: status };

    return this.http.patch(`${this.api}/vacation-requests/${id}/status`, body);
  }

  reproveRequest(id: number, status: string) {
    const body = { STATUS_SOLICITACAO: status };

    return this.http.patch(`${this.api}/vacation-requests/${id}/status`, body);
  }
}
