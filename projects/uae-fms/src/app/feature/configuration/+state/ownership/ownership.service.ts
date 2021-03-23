import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOwnerShip } from '@models/configuration';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';

@Injectable()
export class OwnershipService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IOwnerShip[]>> {
    return this.http.get<ResponseBody<IOwnerShip[]>>(
      environment.baseApiUrl + 'configuration/ownership'
    );
  }
  addOwnership(data): Observable<ResponseBody<IOwnerShip>> {
    return this.http.post<ResponseBody<IOwnerShip>>(
      environment.baseApiUrl + 'configuration/ownership',
      data
    );
  }
  editOwnership(data): Observable<ResponseBody<IOwnerShip>> {
    return this.http.post<ResponseBody<IOwnerShip>>(
      environment.baseApiUrl + 'configuration/ownership',
      data
    );
  }
}
