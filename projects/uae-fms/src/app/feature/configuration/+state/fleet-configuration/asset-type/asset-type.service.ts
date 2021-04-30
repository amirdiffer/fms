import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseBody } from '@models/responseBody';
import { IAssetType } from '@models/asset-type.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';


@Injectable()
export class AssetTypeService {
    constructor(private _http: HttpClient) { }

    loadAll(): Observable<ResponseBody<IAssetType[]>> {
        return this._http.get<ResponseBody<IAssetType[]>>(
          environment.baseApiUrl + 'configuration/fleet-configuration/asset'
        );
    }

    addAssetType (data): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl + 'configuration/fleet-configuration/asset',
          data
        );
    }

    updateAssetType(data): Observable<ResponseBody<any>> {
      return this._http.post<ResponseBody<any>>(
        environment.baseApiUrl + 'configuration/fleet-configuration/asset/' + data.id + '/update',
        data
      );
    }

    addMake(data, assetId): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl +
          'configuration/fleet-configuration/asset/' + assetId + '/make',
          data
        );
    }

    addModel(data, assetId, makeId): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl + 
          'configuration/fleet-configuration/asset/' + assetId + '/make/' + makeId + '/model',
          data
        );
    }

    addTrim(data, assetId, makeId, modelId): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl +
          'configuration/fleet-configuration/asset/' + assetId + '/make/' + makeId + '/model/'+ modelId +'/trim',
          data
        );
    }

    getAssetTypeByID(id){
      return this._http.get<ResponseBody<any>>(
        environment.baseApiUrl + 'configuration/fleet-configuration/asset/' + id
      )
    }

}