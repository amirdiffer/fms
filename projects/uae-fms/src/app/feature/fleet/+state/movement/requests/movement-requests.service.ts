import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovementRequest } from '@models/movement'
import { ResponseBody } from '@models/responseBody';
import { IMovementStatistics } from '@models/statistics';
import { environment } from '@environments/environment';

@Injectable()
export class MovementRequestsService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IMovementRequest[]>> {
    return this.http.get<ResponseBody<IMovementRequest[]>>(
      environment.baseApiUrl + 'movement/request'
    );
  }

  loadRequestStatistic(): Observable<IMovementStatistics> {
    return this.http.get<IMovementStatistics>(
      environment.baseApiUrl + 'movement/stats'
    );
  }

}
