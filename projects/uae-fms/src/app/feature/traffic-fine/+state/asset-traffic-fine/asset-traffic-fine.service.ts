import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssetTrafficFineStateModel } from './asset-traffic-fine.entity';

@Injectable()
export class AssetTrafficFineService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IAssetTrafficFineStateModel[]> {
    return this.http.get<IAssetTrafficFineStateModel[]>('');
  }
}
