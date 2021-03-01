import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovementRequest } from '@models/movement'
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class MovementRequestsService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IMovementRequest[]>> {
    return this.http.get<ResponseBody<IMovementRequest[]>>(
      environment.baseApiUrl + 'movement/request'
    );
  }
}
