import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';

@Injectable({
  providedIn: 'root'
})
export class OverviewNetworkService {
  constructor(private httpClient: HttpClient) {}

  getAsset(id: number): Observable<ResponseBody<any>> {
    return this.httpClient.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id
    );
  }

  getTaskDetail(id: number): Observable<any> {
    return this.httpClient.get(
      environment.baseApiUrl + 'technician/dashboard/task/' + id
    );
  }

  getTaskHistory(id: number): Observable<any> {
    return this.httpClient.get(
      environment.baseApiUrl + 'technician/dashboard/task/' + id + '/history'
    );
  }

  postTechnicianTaskNote(id: number, body: Object): Observable<any> {
    return this.httpClient.post(
      environment.baseApiUrl + 'technician/dashboard/task/' + id + '/note',
      body
    );
  }
}
