import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovementRequest } from '@models/movement'
import { ResponseBody } from '@models/responseBody';
import { IMovementStatistics } from '@models/statistics';
import { environment } from '@environments/environment';

@Injectable()
export class MovementRequestsServiceTemporary {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IMovementRequest[]>> {
    return this.http.get<ResponseBody<IMovementRequest[]>>(
      environment.baseApiUrl + 'movement/temporary/request'
    );
  }

  loadRequestStatistic(): Observable<IMovementStatistics> {
    return this.http.get<IMovementStatistics>(
      environment.baseApiUrl + 'movement/stats'
    );
  }

  addMovementRequest(data): Observable<ResponseBody<IMovementRequest>> {
    return this.http.post<ResponseBody<IMovementRequest>>(
      environment.baseApiUrl + 'movement/request',
      data
    );
  }
  editMovementRequest(data): Observable<ResponseBody<IMovementRequest>> {
    return this.http.post<ResponseBody<IMovementRequest>>(
      environment.baseApiUrl + 'movement/request',
      data
    );
  }

  rejectRequest(data): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'movement/request/' + data + '/reject'
    );
  }

  assignRequest(id, data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'movement/request/' + id + '/assign',
      data
    );
  }

}
