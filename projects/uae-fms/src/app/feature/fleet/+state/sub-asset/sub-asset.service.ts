import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubasset } from '@models/sub-asset';
import { ResponseBody } from '@models/response-body';
import { environment } from '@environments/environment';
import { ISubAssetStatistics } from '@models/statistics';

@Injectable()
export class SubAssetService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<ISubasset[]>> {
    return this.http.get<ResponseBody<ISubasset[]>>(
      environment.baseApiUrl + 'sub-asset'
    );
  }

  loadStatistics(): Observable<ISubAssetStatistics> {
    return this.http.get<ISubAssetStatistics>(
      environment.baseApiUrl + 'sub-asset/stats'
    );
  }

  postSubAsset(data): Observable<ResponseBody<ISubasset>> {
    return this.http.post<ResponseBody<ISubasset>>(
      environment.baseApiUrl + 'sub-asset',
      data
    );
  }

  getSubAsset(id: number) {
    return this.http.get(environment.baseApiUrl + `sub-asset/${id}`);
  }

  editSubAsset(data): Observable<ResponseBody<ISubasset>> {
    return this.http.post<ResponseBody<ISubasset>>(
      environment.baseApiUrl + `sub-asset/${data.id}/update`,
      data
    );
  }

  getAssetTypes(): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + 'configuration/asset-type?size=99999'
    );
  }

  getPolicyTypes(): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + 'configuration/asset-policy?size=99999'
    );
  }
}
