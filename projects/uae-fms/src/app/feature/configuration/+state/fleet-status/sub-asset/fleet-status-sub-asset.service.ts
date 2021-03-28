import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FleetStatusSubAssetStateModel } from './fleet-status-sub-asset.entity';

@Injectable()
export class FleetStatusSubAssetService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<FleetStatusSubAssetStateModel[]> {
    return this.http.get<FleetStatusSubAssetStateModel[]>('');
  }
}
