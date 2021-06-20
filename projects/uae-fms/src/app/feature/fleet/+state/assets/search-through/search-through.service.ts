
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAssetSearchThrough } from "./search-through.entity";
import { environment } from '@environments/environment';
import { ResponseBody } from "@models/responseBody";

@Injectable()
export class AssetSearchThroughService {
    constructor(private _http: HttpClient) {}

    loadAvailableAsset (): Observable<ResponseBody<IAssetSearchThrough[]>> {
        return this._http.get<ResponseBody<IAssetSearchThrough[]>>(
          environment.baseApiUrl + 'asset/search?page=0&sort=id,asc&size=999999'
        );
    }
    
    loadAvailableAssetForAddingRequest (): Observable<ResponseBody<IAssetSearchThrough[]>> {
        return this._http.get<ResponseBody<IAssetSearchThrough[]>>(
          environment.baseApiUrl + 'asset/search/add-request?page=0&sort=id,asc&size=999999'
        );
    }

    loadAvailableAssetForAddingJobCard(): Observable<ResponseBody<IAssetSearchThrough[]>> {
        return this._http.get<ResponseBody<IAssetSearchThrough[]>>(
          environment.baseApiUrl + 'asset/search/add-jobcard?page=0&sort=id,asc&size=999999'
        );
    }
}
