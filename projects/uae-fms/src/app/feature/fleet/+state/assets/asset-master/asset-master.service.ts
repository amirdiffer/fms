import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssetStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { IAssetMaster, IAssetOverview } from '@models/asset-master.model';
import { ResponseBody } from '@models/responseBody';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class AssetMasterService {
  constructor(
    private _http: HttpClient,
    private _tableFacade: TableFacade,
    private _tblFilterService: TableFilterService
  ) {}

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

  getFilter() {
    let removeFilterKey = [];
    this._tableFacade.getFiltersByName('assetMaster').subscribe((x) => {
      let filter = '';
      if (x != null) {
        let value: object[] = x.value ? Object.values(x.value) : [];
        value.forEach((y) => {
          if (y['value'] && y['value'] != '') {
            let filterApiKey = y['filterApiKey']
              ? y['filterApiKey']
              : y['name'];
            if (!removeFilterKey.includes(filterApiKey)) {
              let b = this._tblFilterService.convertData(y);
              filter = filter + b + ';';
            }
          }
        });
      }
      this.params = this.params.set('filter', filter);
    });
  }

  loadAll(): Observable<ResponseBody<IAssetMaster[]>> {
    this.getFilter();
    return this._http.get<ResponseBody<IAssetMaster[]>>(
      environment.baseApiUrl + 'asset',
      { params: this.getParam('asset_asset-master') }
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
  getAssetByID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id
    );
  }

  overviewAsset() {
    return this._http.get<ResponseBody<IAssetOverview>>(
      environment.baseApiUrl + 'asset/overview'
    );
  }

  getAssetTasksByID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/task'
    );
  }

  getAssetMovementTemporaryByID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/movement/temporary'
    );
  }

  getRequestsByAssetID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/request'
    );
  }

  getJobCardByAssetID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/jobcard'
    );
  }

  getActiveJobCardByAssetID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/jobcard/active'
    );
  }

  getDamageByAssetID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/damage'
    );
  }

  getTrafficFineByAssetID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/traffic-fine'
    );
  }

  getFuelCardByAssetID(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/fuel-card'
    );
  }

  /* Get All Asset that we can add a workshop request for them */
  getAllAllowedAssetForRequest() {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl +
        `asset/search/add-request?page=0&sort=id,asc&size=99999999`
    );
  }

  /* Get All Asset that we can add a workshop jobcard for them */
  getAllAllowedAssetForJobcard(): Observable<ResponseBody<any[]>> {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl +
        `asset/search/add-jobcard??page=0&sort=id,asc&size=99999999`
    );
  }
}
