import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetTypeStateModel } from './asset-type.entity';

@Injectable()
export class AssetTypeService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<AssetTypeStateModel[]> {
    return this.http.get<AssetTypeStateModel[]>('');
  }
}
