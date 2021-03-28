import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FleetStatusAssetStateModel } from './fleet-status-asset.entity';

@Injectable()
export class FleetStatusAssetService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<FleetStatusAssetStateModel[]> {
    return this.http.get<FleetStatusAssetStateModel[]>('');
  }
}
