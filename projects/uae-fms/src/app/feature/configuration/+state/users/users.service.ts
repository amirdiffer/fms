import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/response-body';
import { IUser } from '@models/configuration';
import { environment } from '@environments/environment';
import { IUserStatistics } from '@models/statistics';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IUser[]>> {
    return this.http.get<ResponseBody<IUser[]>>(
      environment.baseApiUrl + 'configuration/user'
    );
  }
  loadAllStatistics(): Observable<ResponseBody<IUserStatistics>> {
    return this.http.get<ResponseBody<IUserStatistics>>(
      environment.baseApiUrl + 'configuration/user/stats'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user',
      data
    );
  }
}
