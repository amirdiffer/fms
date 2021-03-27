import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssetStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { IAssetMaster } from '@models/asset-master.model';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class AssetMasterService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IAssetMaster[]>> {
    return this._http.get<ResponseBody<IAssetMaster[]>>(
      environment.baseApiUrl + 'asset'
    );
  }

  loadStatistics(): Observable<IAssetStatistics> {
    return this._http.get<IAssetStatistics>(
      environment.baseApiUrl + 'asset/stats'
    );
  }

  addAsset(data): Observable<ResponseBody<IAssetMaster>> {
    return this._http.post<ResponseBody<IAssetMaster>>(
      environment.baseApiUrl + 'asset',
      data
    );
  }
  editAsset(data): Observable<ResponseBody<IAssetMaster>> {
    return this._http.post<ResponseBody<IAssetMaster>>(
      environment.baseApiUrl + 'asset',
      data
    );
  }
}
