import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/response-body';
import { IRequest, IRequestListSpecificAsset } from '@models/body-shop';
import { environment } from '@environments/environment';
import { IBodyShopRequestStatistics } from '@models/statistics';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class BodyShopRequestService {
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
    let removeFilterKey = ['organization'];
    this._tableFacade.getFiltersByName('bodyShop_request').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<any[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/asset/request',
      { params: this.getParam('body-shop_request') }
    );
  }

  requestsById(data): Observable<ResponseBody<any[]>> {
    return this.http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + `workshop/bodyshop/asset/${data}/request`
    );
  }

  loadStatistics(): Observable<IBodyShopRequestStatistics> {
    return this.http.get<IBodyShopRequestStatistics>(
      environment.baseApiUrl + 'workshop/bodyshop/stats'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/request',
      data
    );
  }
  editRequest(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'workshop/bodyshop/request/' +
        data.id +
        '/update',
      data
    );
  }
  getRequestById(id): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/request/' + id
    );
  }

  getRequestListByAssetId(
    id
  ): Observable<ResponseBody<IRequestListSpecificAsset[]>> {
    return this.http.get<ResponseBody<IRequestListSpecificAsset[]>>(
      environment.baseApiUrl + `workshop/bodyshop/asset/${id}/request`,
      { params: this.getParam('body-shop_request') }
    );
  }
}
