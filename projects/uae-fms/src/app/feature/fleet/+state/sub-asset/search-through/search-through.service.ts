import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseBody } from "@models/responseBody";
import { Observable } from "rxjs";
import { ISubAssetSearchThrough } from "./search-through.entity";
import { environment } from '@environments/environment';

@Injectable()
export class SubAssetSearchThroughService{
    constructor(private _http: HttpClient) {}

    loadAvailableSubAssetWithModelId (id:number): Observable<ResponseBody<ISubAssetSearchThrough[]>> {
        return this._http.get<ResponseBody<ISubAssetSearchThrough[]>>(
          environment.baseApiUrl + `sub-asset/search/${id}?page=0&sort=createdAt,desc&size=999999`
        );
    }


}