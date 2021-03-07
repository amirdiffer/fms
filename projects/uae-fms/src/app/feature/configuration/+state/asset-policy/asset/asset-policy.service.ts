import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body.model';
import { IAssetPolicy } from '@models/asset-policy.model';

@Injectable()
export class AssetPolicyService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IAssetPolicy[]>> {
    return this.http.get<ResponseBody<IAssetPolicy[]>>(
      environment.baseApiUrl + 'configuration/asset-policy'
    );
  }
  postAssetPolicy(data): Observable<ResponseBody<IAssetPolicy>> {
    return this.http.post<ResponseBody<IAssetPolicy>>(
      environment.baseApiUrl + 'configuration/asset-policy',
      data
    )
  }
}
