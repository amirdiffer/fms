import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseBody } from '@models/responseBody';
import { IAssetType } from '@models/asset-type.model';

@Injectable()
export class SubAssetTypeService {
    constructor(private _http: HttpClient) { }

    loadAll(): Observable<ResponseBody<IAssetType[]>> {
        return this._http.get<ResponseBody<IAssetType[]>>(
          environment.baseApiUrl + 'configuration/fleet-configuration/sub-asset'
        );
    }

    addSubAssetType (data): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl + 'configuration/fleet-configuration/sub-asset',
          data
        );
    }

    updateSubAssetType(data): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl + 'configuration/fleet-configuration/sub-asset/' + data.id + '/update',
          data
        );
    }

    getSubAssetTypeById(id){
        return this._http.get<ResponseBody<any>>(
          environment.baseApiUrl + 'configuration/fleet-configuration/sub-asset/' + id
        )
    }

    addMake(data, subAssetTypeId): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl +
          'configuration/fleet-configuration/sub-asset/' + subAssetTypeId + '/make',
          data
        );
    }

    addModel(data, subAssetTypeId, makeId): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl + 
          'configuration/fleet-configuration/sub-asset/' + subAssetTypeId + '/make/' + makeId + '/model',
          data
        );
    }
}