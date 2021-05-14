import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMyOrderListModel } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.entity';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class MyOrderSubAssetService {

  params = new HttpParams();

  constructor(private _http: HttpClient, private tableFacade: TableFacade) {
  }

  getParam(name) {
    this.tableFacade.getPaginationByName(name).subscribe(x => {
      if (x != null) {
        this.params = this.params.set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAll(): Observable<ResponseBody<IMyOrderListModel[]>> {
    return this._http.get<ResponseBody<IMyOrderListModel[]>>(environment.baseApiUrl + 'partstore/order-list/sub-asset/order',
      { params: this.getParam('order') })
  }

  getOrderById(id: number): Observable<any> {
    return this._http.get<any>(environment.baseApiUrl + 'partstore/order-list/sub-asset/order/' + id);
  }

  addOrder(data: any): Observable<any> {
    return this._http.post<any>(environment.baseApiUrl + 'partstore/order-list/sub-asset/order', data);
  }

  addRequest(data: any): Observable<any> {
    return this._http.post<any>(environment.baseApiUrl + 'partstore/order-list/sub-asset/request', data);
  }

  updateOrder(data: any): Observable<any> {
    return this._http.post<any>(environment.baseApiUrl + 'partstore/order-list/sub-asset/order/' + data.id + '/update', data);
  }

  archiveOrder(id: number): Observable<any> {
    return this._http.post<any>(environment.baseApiUrl + 'partstore/order-list/sub-asset/order/' + id + '/archive', undefined);
  }

  receiveOrder(data: any): Observable<any> {
    return this._http.post<any>(environment.baseApiUrl + 'partstore/order-list/sub-asset/order/' + data.id + '/receive', data);
  }
}
