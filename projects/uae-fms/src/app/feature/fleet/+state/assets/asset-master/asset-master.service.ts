import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssetMasterModel } from '@feature/fleet/+state/assets/asset-master/asset-master.entity';

@Injectable()
export class AssetMasterService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<IAssetMasterModel[]> {
    return this._http.get<IAssetMasterModel[]>('');
  }
}
