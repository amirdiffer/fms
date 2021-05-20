import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssetStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { IAssetMaster } from '@models/asset-master.model';
import { ResponseBody } from '@models/responseBody';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class AssetMasterService {
  constructor(private _http: HttpClient, private _tableFacade: TableFacade) {}

  params = new HttpParams();
  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe(x => {
      if (x != null) {
        this.params = this.params.set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAll(): Observable<ResponseBody<IAssetMaster[]>> {
    return this._http.get<ResponseBody<IAssetMaster[]>>(
      environment.baseApiUrl + 'asset'
    );
  }

  loadStatistics(): Observable<IAssetStatistics> {
    return this._http.get<IAssetStatistics>(
      environment.baseApiUrl + 'asset/stats'
    );
  }

  addAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'asset',
      data
    );
  }
  editAsset(data): Observable<ResponseBody<IAssetMaster>> {
    return this._http.post<ResponseBody<IAssetMaster>>(
      environment.baseApiUrl + 'asset/' + data.id + '/update',
      data
    );
  }
  getAssetByID(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id
    )
  }

  getAssetTasksByID(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/task'
    )
  }

  getAssetMovementTemporaryByID(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/movement/temporary'
    )
  }

}
