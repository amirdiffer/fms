import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFleetStatus } from '@models/fleet-status.model';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body.model';

@Injectable()
export class FleetStatusSubAssetService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IFleetStatus[]>> {
    return this.http.get<ResponseBody<IFleetStatus[]>>(
      environment.baseApiUrl + 'configuration/fleet-status'
    );
  }
}
