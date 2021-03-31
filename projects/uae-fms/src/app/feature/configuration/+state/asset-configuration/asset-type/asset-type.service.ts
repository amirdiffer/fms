import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { IAssetType } from '@models/asset-type.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class AssetTypeService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IAssetType[]>> {
    return this.http.get<ResponseBody<IAssetType[]>>(
      environment.baseApiUrl + '/configuration/asset-type'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http
      .post<ResponseBody<any>>(
        environment.baseApiUrl + 'configuration/asset-type',
        data
      )
      .pipe(
        tap((res) => {
          console.log(data);
          console.log(res);
        })
      );
  }

  postMake(data): Observable<ResponseBody<any>> {
    return this.http
      .post<ResponseBody<any>>(
        environment.baseApiUrl + 'configuration/asset-type',
        data
      )
      .pipe(
        tap((res) => {
          console.log(data);
          console.log(res);
        })
      );
  }

  postModel(data): Observable<ResponseBody<any>> {
    return this.http
      .post<ResponseBody<any>>(
        environment.baseApiUrl + 'configuration/asset-type',
        data
      )
      .pipe(
        tap((res) => {
          console.log(data);
          console.log(res);
        })
      );
  }
}
