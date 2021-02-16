import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetConfigurationStateModel } from './asset-configuration.entity';

@Injectable()
export class AssetConfigurationService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<AssetConfigurationStateModel[]> {
    return this.http.get<AssetConfigurationStateModel[]>('');
  }
}
