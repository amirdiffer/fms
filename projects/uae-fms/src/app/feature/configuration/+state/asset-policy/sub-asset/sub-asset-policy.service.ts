import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubAssetPolicyStateModel } from './sub-asset-policy.entity';

@Injectable()
export class SubAssetPolicyService {
  constructor(private http: HttpClient) {}
  loadAll(): Observable<SubAssetPolicyStateModel[]> {
    return this.http.get<SubAssetPolicyStateModel[]>('');
  }
}
