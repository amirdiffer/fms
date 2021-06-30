import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body.model';
import { IAssetPolicy } from '@models/asset-policy.model';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class AssetPolicyService {
  constructor(
    private http: HttpClient,
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
    this._tableFacade.getFiltersByName('assetPolicy_asset').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IAssetPolicy[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IAssetPolicy[]>>(
      environment.baseApiUrl + 'configuration/asset-policy/asset',
      { params: this.getParam('asset-policy_asset') }
    );
  }
  postAssetPolicy(data): Observable<ResponseBody<IAssetPolicy>> {
    return this.http.post<ResponseBody<IAssetPolicy>>(
      environment.baseApiUrl + 'configuration/asset-policy',
      data
    );
  }

  updateAssetPolicy(data): Observable<ResponseBody<IAssetPolicy>> {
    return this.http.post<ResponseBody<IAssetPolicy>>(
      environment.baseApiUrl + `configuration/asset-policy/${data.id}/update`,
      data
    );
  }

  getAssetById(id: number): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/asset-policy/' + id
    );
  }
}
