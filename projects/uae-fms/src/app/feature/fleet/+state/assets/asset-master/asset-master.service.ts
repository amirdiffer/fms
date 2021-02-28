import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssetMasterModel } from '@feature/fleet/+state/assets/asset-master/asset-master.entity';
import { IAssetStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class AssetMasterService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<IAssetMasterModel[]> {
    return this._http.get<IAssetMasterModel[]>('');
  }

  loadStatistics(): Observable<IAssetStatistics> {
    return this._http.get<IAssetStatistics>(
      environment.baseApiUrl + 'asset/stats'
    );
  }
}
