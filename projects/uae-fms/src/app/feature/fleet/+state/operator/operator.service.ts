import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOperator } from '@models/operator';
import { ResponseBody } from '@models/responseBody';
import { IOperatorStatistics } from '@models/statistics';
import { environment } from '@environments/environment';

@Injectable()
export class OperatorService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IOperator[]>> {
    return this.http.get<ResponseBody<IOperator[]>>(
      environment.baseApiUrl + 'configuration/user'
    );
  }

  loadAllStatistics(): Observable<ResponseBody<IOperatorStatistics>> {
    return this.http.get<ResponseBody<IOperatorStatistics>>(
      environment.baseApiUrl + 'configuration/user/stats'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user',
      data
    );
  }

  editOperator(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user/' + data.id + '/update',
      data
    );
  }

  searchEmployee(id) {
    return this.http.get<ResponseBody<IOperatorStatistics>>(
      environment.baseApiUrl + 'configuration/user/employee/' + id
    );
  }

  getOperatorById(id) {
    return this.http.get<ResponseBody<IOperator>>(
      environment.baseApiUrl + 'configuration/user/' + id
    );
  }
}
