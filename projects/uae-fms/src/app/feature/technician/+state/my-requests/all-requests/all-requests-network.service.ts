import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllRequestsNetworkService {

  constructor(private httpClient: HttpClient) { }

  getAllRequests(): Observable<ResponseBody<any>> {
    return this.httpClient.get<ResponseBody<any>>(environment.baseApiUrl + 'technician/dashboard/request');
  }
}
