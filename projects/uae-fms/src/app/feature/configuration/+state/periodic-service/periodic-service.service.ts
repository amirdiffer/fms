import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IPeriodicService } from '@models/configuration';
import { ResponseBody } from '@models/response-body';

@Injectable()
export class PeriodicServiceService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IPeriodicService[]>> {
    return this.http.get<ResponseBody<IPeriodicService[]>>(
      environment.baseApiUrl + 'configuration/periodic-service'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/periodic-service',
      data
    );
  }
}
