import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseBody } from "@models/responseBody";
import { Observable } from "rxjs";
import { IOperatorSearchThrough } from "./search-through.entity";
import { environment } from '@environments/environment';

@Injectable()
export class OperatorSearchThroughService{
    constructor(private _http: HttpClient) {}

    loadAvailableOperator (): Observable<ResponseBody<IOperatorSearchThrough[]>> {
        return this._http.get<ResponseBody<IOperatorSearchThrough[]>>(
          environment.baseApiUrl + 'operator/search?page=0&sort=id,asc&size=999999'
        );
    }


}