import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssetUsageStateModel } from './asset-usage.entity';

@Injectable()
export class AssetUsageService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IAssetUsageStateModel[]> {
    return this.http.get<IAssetUsageStateModel[]>('');
  }
}
