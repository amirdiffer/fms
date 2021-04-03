import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IAssetType } from '@models/asset-type.model';

@Injectable()
export class AssetConfigurationService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IAssetType[]>> {
    return this.http.get<ResponseBody<IAssetType[]>>(
      environment.baseApiUrl + 'configuration/asset-type?page=0&sort=createdAt,desc&size=1000');
  }
}
