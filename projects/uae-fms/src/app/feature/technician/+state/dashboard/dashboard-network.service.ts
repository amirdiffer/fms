import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';

@Injectable({
  providedIn: 'root'
})
export class DashboardNetworkService {
  constructor(private httpClient: HttpClient) {}

  getStatistics(): Observable<ResponseBody<any>> {
    return this.httpClient.get<ResponseBody<any>>(
      environment.baseApiUrl + 'technician/dashboard/task/stats'
    );
  }

  getTasks(): Observable<ResponseBody<any>> {
    return this.httpClient.get<ResponseBody<any>>(
      environment.baseApiUrl + 'technician/dashboard/task'
    );
  }
}
