
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseBody } from '@models/responseBody';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable()
export class AccessoryTypeService {
    constructor(private _http: HttpClient) { }


    loadAll(): Observable<ResponseBody<any[]>> {
        return this._http.get<ResponseBody<any[]>>(
          environment.baseApiUrl + 'configuration/fleet-configuration/accessory'
        );
    }


    getAccessoryTypeByID(id){
      return this._http.get<ResponseBody<any>>(
        environment.baseApiUrl + 'configuration/fleet-configuration/accessory/' + id
      )
    }

    updateAccessoryType(data): Observable<ResponseBody<any>> {
      return this._http.post<ResponseBody<any>>(
        environment.baseApiUrl + 'configuration/fleet-configuration/accessory/' + data.id + '/update',
        data
      );
    }


    addAccessoryType (data): Observable<ResponseBody<any>> {
        return this._http.post<ResponseBody<any>>(
          environment.baseApiUrl + 'configuration/fleet-configuration/accessory',
          data
        );
    }



}

