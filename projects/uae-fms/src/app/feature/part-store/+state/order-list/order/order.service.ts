import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class OrderListService {

  params = new HttpParams();

  constructor(private _http: HttpClient, private _tableFacade: TableFacade) {}

  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe(x => {
      if (x != null) {
        this.params = this.params.set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }


  /* '''''Load''''' order For Asset and Sub Asset */
  loadOrderPartOfAsset(): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order' ,
      {params: this.getParam('part-store-order-list')}
    )
  };

  loadOrderPartOfSubAsset(): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order' ,
      {params: this.getParam('part-store-order-list')}
    )
  };



  /* ''''''Add'''''' Order For Asset and Sub Asset */
  addOrderOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order',
      data
    );
  };

  addOrderfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order',
      data
    );
  };




  /* '''''Load''''' statistics of order For Asset and Sub Asset */
  loadStatisticsOfOrderPartOfAsset(): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order/stats'
    );
  };

  loadStatisticsOfOrderPartOfSubAsset(): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order/stats'
    );
  };


  /* '''''Get''''' Specific order for asset and sub asset */
  getSpecificOrderPartOfAsset(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order/' + id
    );
  };

  getSpecificOrderPartOfSubAsset(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order/' + id
    );
  };



  /* '''''Update''''' Order of Asset and Sub Asset*/
  updateOrderPartOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order/' + data.id + '/update',
      data
    );
  };

  updateOrderPartOfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order/' + data.id + '/update',
      data
    );
  };

  

  /* '''''Receive''''' Order of Asset and Sub Asset*/
  receiveSpecificOrderPartOfAsset(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order/' + id + '/receive'
    );
  };

  receiveSpecificOrderPartOfSubAsset(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/sub-asset/order/' + id + '/receive'
    );
  };





  
}
