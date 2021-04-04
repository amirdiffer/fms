import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IToll } from '@models/toll';
import { ITollStatistics } from '@models/statistics';

@Injectable()
export class TollService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IToll[]>> {
    return this.http.get<ResponseBody<IToll[]>>(
      environment.baseApiUrl + 'toll'
    );
  }
  loadStatistic(): Observable<ResponseBody<ITollStatistics>> {
    return this.http.get<ResponseBody<ITollStatistics>>(
      environment.baseApiUrl + 'toll/stats'
    );
  }
  assigningToll(data): Observable<any> {
    (data);
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + `toll/${data['id']}/assign`,
      data
    );
  }
  addToll(data): Observable<ResponseBody<IToll>> {
    return this.http.post<ResponseBody<IToll>>(
      environment.baseApiUrl + `toll`,
      data
    );
  }
}
