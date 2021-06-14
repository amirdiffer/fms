import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartRequestsNetworkService {

  constructor(private httpClient: HttpClient) { }

  getPartRequests(): Observable<ResponseBody<any>> {
    return this.httpClient.get<ResponseBody<any>>(environment.baseApiUrl + 'technician/dashboard/request/part')
  }
}
