import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IPeriodicService, ISpecificPeriodicService } from '@models/configuration';
import { ResponseBody } from '@models/response-body';

@Injectable()
export class PeriodicServiceService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IPeriodicService[]>> {
    return this.http.get<ResponseBody<IPeriodicService[]>>(
      environment.baseApiUrl + 'configuration/periodic-service'
    );
  }

  getById(id: number) {
    return this.http.get<ResponseBody<ISpecificPeriodicService>>(
      environment.baseApiUrl + `configuration/periodic-service/${id}`
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/periodic-service',
      data
    );
  }

  update(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'configuration/periodic-service/' +
        data.id +
        '/update',
      data
    );
  }
}
