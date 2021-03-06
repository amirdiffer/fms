import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IFleetStatus } from '@models/fleet-status.model';
import { ResponseBody } from '@models/response-body.model';

@Injectable()
export class FleetStatusAssetService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IFleetStatus[]>> {
    return this.http.get<ResponseBody<IFleetStatus[]>>(
      environment.baseApiUrl + 'configuration/fleet-status'
    );
  }
}
