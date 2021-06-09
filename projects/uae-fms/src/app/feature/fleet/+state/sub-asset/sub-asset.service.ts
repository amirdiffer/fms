import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubasset } from '@models/sub-asset';
import { ResponseBody } from '@models/response-body';
import { environment } from '@environments/environment';
import { ISubAssetStatistics } from '@models/statistics';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class SubAssetService {
  constructor(private http: HttpClient, private _tableFacade: TableFacade) { }

  params = new HttpParams();
  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe((x) => {
      if (x != null) {
        this.params = this.params
          .set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAll(): Observable<ResponseBody<ISubasset[]>> {
    return this.http.get<ResponseBody<ISubasset[]>>(
      environment.baseApiUrl + 'sub-asset',
      { params: this.getParam('sub-asset') }
    );
  }

  loadStatistics(): Observable<ISubAssetStatistics> {
    return this.http.get<ISubAssetStatistics>(
      environment.baseApiUrl + 'sub-asset/stats'
    );
  }

  postSubAsset(data): Observable<ResponseBody<ISubasset>> {
    return this.http.post<ResponseBody<ISubasset>>(
      environment.baseApiUrl + 'sub-asset',
      data
    );
  }

  getSubAsset(id: number) {
    return this.http.get(environment.baseApiUrl + `sub-asset/${id}`);
  }

  editSubAsset(data): Observable<ResponseBody<ISubasset>> {
    return this.http.post<ResponseBody<ISubasset>>(
      environment.baseApiUrl + `sub-asset/${data.id}/update`,
      data
    );
  }

  getPolicyTypes(): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + 'configuration/asset-policy?size=99999'
    );
  }

  loadFullList(): Observable<ResponseBody<ISubasset[]>> {
    return this.http.get<ResponseBody<ISubasset[]>>(
      environment.baseApiUrl + 'sub-asset?page=0&size=99999999'
    );
  }

  getSpecificSubAsset(id): Observable<any> {
    return this.http.get<Observable<any>>(
      environment.baseApiUrl + 'sub-asset/' + id
    );
  }

  subAssetOverview(): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'sub-asset/overview'
    );
  }
}
