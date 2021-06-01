import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ITrafficFine } from '@models/traffic-fine';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { ITrafficFineStatistics } from '@models/statistics';

@Injectable()
export class TrafficFineTableService {
  constructor(private http: HttpClient) {}


  data: ITrafficFine[] = this.returnMockData();

  returnMockData(): ITrafficFine[] {
    let d: ITrafficFine[] = [];
    for (let i = 1; i < 8; i++) {
      d.push(
        {
          amount: i,
          date: 'test data test data test data test data test data test data test data ',
          department: { id: i, name: 'test data', organizationId: i, organizationName: 'test data' },
          duration: i,
          id: i,
          missionStatus: '',
          operator: { firstName: 'test data', id: i, lastName: 'test data' },
          plateNumber: 'test data',
          status: 'test data',
          tcCode: i,
          type: 'test data',
          userStatus: 'test data',
        },
      )
    }
    return d;
  }

  loadAll(): Observable<ResponseBody<ITrafficFine[]>> {
    // return this.http.get<ResponseBody<ITrafficFine[]>>(
    //   environment.baseApiUrl + 'traffic-fine'
    // );
    return of({
      error: false,
      resultNumber: this.returnMockData().length,
      message: this.returnMockData()
    })
  }

  loadStatistics(): Observable<ITrafficFineStatistics> {
    // return this.http.get<ITrafficFineStatistics>(
    //   environment.baseApiUrl + 'traffic-fine/stats'
    // );
    return of({
      error: false,
      resultNumber: 1,
      message: {
        deducted: 5,
        paid: 5,
        total: 15,
        unpaid: 5
      }
    })

  }
}
