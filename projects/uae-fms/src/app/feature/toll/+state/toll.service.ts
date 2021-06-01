import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IToll } from '@models/toll';
import { ITollStatistics } from '@models/statistics';

@Injectable()
export class TollService {
  constructor(private http: HttpClient) {}

  data: IToll[] = this.returnMockData();

  returnMockData(): IToll[] {
    let d: IToll[] = [];
    for (let i = 1; i < 8; i++) {
      d.push(
        {
          id: i,
          purchaseDate: "test data",
          relatedAsset: {
            dpd: "test data",
            id: i
          },
          status: "test data",
          tollTag: "test data"
        },
      )
    }
    return d;
  }

  loadAll(): Observable<ResponseBody<IToll[]>> {
    // return this.http.get<ResponseBody<IToll[]>>(
    //   environment.baseApiUrl + 'toll'
    // );
    return of({
      error: false,
      resultNumber: this.returnMockData().length,
      message: this.returnMockData()
    })
  }

  loadStatistic(): Observable<ResponseBody<ITollStatistics>> {
    // return this.http.get<ResponseBody<ITollStatistics>>(
    //   environment.baseApiUrl + 'toll/stats'
    // );
    return of({
      error: false,
      resultNumber: 1,
      message: {
        total: 522,
        available: 200,
        assigned: 22
      }
    })
  }
  assigningToll(data): Observable<any> {
    data;
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
