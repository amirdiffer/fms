import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { IAssetType } from '@models/asset-type.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class AssetTypeService {
  constructor(private http: HttpClient) { }

  loadAll(): Observable<ResponseBody<IAssetType[]>> {
    return this.http.get<ResponseBody<IAssetType[]>>(
      environment.baseApiUrl + 'configuration/asset-type'
    );
  }

  allAsset(): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<IAssetType[]>>(
      environment.baseApiUrl + 'configuration/fleet-configuration/asset'
    );
  }

  allSubAsset(): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<IAssetType[]>>(
      environment.baseApiUrl + 'configuration/fleet-configuration/sub-asset'
    );
  }

  allAccessory(): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<IAssetType[]>>(
      environment.baseApiUrl + 'configuration/fleet-configuration/accessory'
    );
  }


  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/asset-type',
      data
    );
  }

  postMake(data, assetId): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
      'configuration/asset-type/' + assetId + '/make',
      data
    );
  }

  postModel(data, assetId, makeId): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/asset-type/' + assetId + '/make/' + makeId + '/model',
      data
    );
  }

  postTrim(data, assetId, makeId, modelId): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
      'configuration/asset-type/' + assetId + '/make/' + makeId + '/model/'+modelId+'/trim',
      data
    );
  }
}
