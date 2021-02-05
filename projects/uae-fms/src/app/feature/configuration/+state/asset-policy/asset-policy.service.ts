import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetPolicyStateModel } from './asset-policy.entity';

@Injectable()
export class AssetPolicyService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<AssetPolicyStateModel[]> {
    return this.http.get<AssetPolicyStateModel[]>('');
  }
}
