import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IPendingCustomization } from '@models/pending-customization.model';

@Injectable()
export class CustomizationService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IPendingCustomization[]>> {
    return this._http.get<ResponseBody<IPendingCustomization[]>>(
      environment.baseApiUrl + 'asset/customization'
    );
  }

  compelete(data, id) {
    return this._http.post(
      environment.baseApiUrl + `asset/${id}/customization`,
      data
    );
  }

  getAssetForCustomizationByAssetId(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/customization'
    );
  }
}
