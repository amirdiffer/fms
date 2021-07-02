import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { ResponseBody } from '@models/responseBody';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class OrderListService {
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
    this._tableFacade.getFiltersByName('partStore_order').subscribe((x) => {
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

  /* '''''Load''''' order For Asset and Sub Asset */
  loadOrderPartOfAsset(): Observable<ResponseBody<any>> {
    this.getFilter();
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order',
      { params: this.getParam('part-store-order-list') }
    );
  }

  loadOrderPartOfSubAsset(): Observable<ResponseBody<any>> {
    this.getFilter();
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order',
      { params: this.getParam('part-store-order-list') }
    );
  }

  /* ''''''Add'''''' Order For Asset and Sub Asset */
  addOrderOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order',
      data
    );
  }

  addOrderfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order',
      data
    );
  }

  /* '''''Load''''' statistics of order For Asset and Sub Asset */
  loadStatisticsOfOrderPartOfAsset(): Observable<ResponseBody<any>> {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order/stats'
    );
  }

  loadStatisticsOfOrderPartOfSubAsset(): Observable<ResponseBody<any>> {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order/stats'
    );
  }

  /* '''''Get''''' Specific order for asset and sub asset */
  getSpecificOrderPartOfAsset(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order/' + id
    );
  }

  getSpecificOrderPartOfSubAsset(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order/' + id
    );
  }

  /* '''''Update''''' Order of Asset and Sub Asset*/
  updateOrderPartOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/asset/order/' +
        data.id +
        '/update',
      data
    );
  }

  updateOrderPartOfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/sub-asset/order/' +
        data.id +
        '/update',
      data
    );
  }

  /* '''''Receive''''' Order of Asset and Sub Asset*/
  receiveSpecificOrderPartOfAsset(data) {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/asset/order/' +
        data.id +
        '/receive',
      data
    );
  }

  receiveSpecificOrderPartOfSubAsset(data) {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'partstore/order-list/sub-asset/order/' +
        data.id +
        '/receive',
      data
    );
  }
}
