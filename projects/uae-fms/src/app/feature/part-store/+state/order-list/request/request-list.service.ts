import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { tap } from 'rxjs/operators';
import { ResponseBody } from '@models/responseBody';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class RequestListService {
  params = new HttpParams();

  constructor(
    private _http: HttpClient,
    private _tableFacade: TableFacade,
    private _tblFilterService: TableFilterService
  ) {}

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
    this._tableFacade.getFiltersByName('partStore_request').subscribe((x) => {
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

  /* '''''Load''''' Requets For Asset and Sub Asset */
  loadRequestPartOfAsset(): Observable<ResponseBody<any>> {
    this.getFilter();
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/order-list/asset/request',
      { params: this.getParam('part-store-request-list') }
    );
  }

  loadRequestPartOfSubAsset(): Observable<ResponseBody<any>> {
    this.getFilter();
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/request',
      { params: this.getParam('part-store-request-list') }
    );
  }

  /* ''''''Add'''''' Requet For Asset and Sub Asset */
  addRequestfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/request',
      data
    );
  }

  addRequestfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/request',
      data
    );
  }

  /* '''''Load''''' statistics of request For Asset and Sub Asset */
  loadStatisticsOfRequestPartOfAsset(): Observable<ResponseBody<any>> {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/request/stats'
    );
  }

  loadStatisticsOfRequestPartOfSubAsset(): Observable<ResponseBody<any>> {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/request/stats'
    );
  }

  /* '''''Get''''' Specific request for asset and sub asset */
  getSpecificRequestPartOfAsset(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/request/' + id
    );
  }

  getSpecificRequestPartOfSubAsset(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/request/' + id
    );
  }

  /* '''''Update''''' Request of Asset and Sub Asset*/
  updateRequestPartOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/asset/request/' +
        data.id +
        '/update',
      data
    );
  }

  updateRequestPartOfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/sub-asset/request/' +
        data.id +
        '/update',
      data
    );
  }

  /* '''''Approve''''' Request of Asset and Sub Asset*/
  approveSpecificRequestPartOfAsset(id) {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/asset/request/' +
        id +
        '/approve',
      null
    );
  }

  approveSpecificRequestPartOfSubAsset(id) {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/sub-asset/request/' +
        id +
        '/approve',
      null
    );
  }

  /* '''''Reject''''' Request of Asset and Sub Asset*/
  rejectSpecificRequestPartOfAsset(id) {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/asset/request/' +
        id +
        '/reject',
      null
    );
  }

  rejectSpecificRequestPartOfSubAsset(id) {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/sub-asset/request/' +
        id +
        '/reject',
      null
    );
  }
}
