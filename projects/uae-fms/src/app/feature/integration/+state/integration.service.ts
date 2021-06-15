import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IIntegration } from '@models/integration';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';

@Injectable()
export class IntegrationService {
  constructor(private http: HttpClient) {}

  data = this.returnMockData();

  returnMockData() {
    let d = [];
    for (let i = 1; i < 8; i++) {
      d.push({
        id: i,
        name: 'test data',
        type: 'test data',
        companyName: 'test data',
        grp: 'test data',
        isConnected: 'test data',
        email: 'test data',
        phoneNumber: 'test data',
        supportOperator: { firstName: 'test data', lastName: 'test data' }
      });
    }
    return d;
  }

  loadAll(): Observable<ResponseBody<IIntegration[]>> {
    // return this.http.get<ResponseBody<IIntegration[]>>(
    //   environment.baseApiUrl + 'configuration/integrations'
    // );
    return of({
      error: false,
      resultNumber: this.returnMockData().length,
      message: this.returnMockData()
    });
  }
  post(data): Observable<ResponseBody<IIntegration>> {
    return this.http.post<ResponseBody<IIntegration>>(
      environment.baseApiUrl + 'configuration/integrations',
      data
    );
  }
}
