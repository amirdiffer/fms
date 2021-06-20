import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseBody } from "@models/responseBody";
import { Observable } from "rxjs";
import { IAccessorySearchThrough } from "./search-through.entity";
import { environment } from '@environments/environment';

@Injectable()
export class AccessorySearchThroughService{
    constructor(private _http: HttpClient) {}

    loadAvailableAccessory (): Observable<ResponseBody<IAccessorySearchThrough[]>> {
        return this._http.get<ResponseBody<IAccessorySearchThrough[]>>(
          environment.baseApiUrl + 'accessory/search?page=0&sort=id,asc&size=9999999'
        );
    }


}