import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubAssetStateModel } from './sub-asset.entity';

@Injectable()
export class SubAssetService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<SubAssetStateModel[]> {
    return this.http.get<SubAssetStateModel[]>('');
  }
}
