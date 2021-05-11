import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class PartListService {
  params = new HttpParams();

  constructor(private _http: HttpClient, private _tableFacade: TableFacade) {}

  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe((x) => {
      if (x != null) {
        this.params = this.params
          .set('page', x.page.toString())
          .set('sort', 'item_id')
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  };

  /* Asset Part */

  getAccumulatedPartOfAsset(id): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + '/partstore/part-list/asset/category/' + id +'/accumulated' ,{params: this.getParam('asset-accumulated-part-list')}
    )
  };

  getPartListOfAsset(id): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-list/asset/item/' + id
    )
  };

  getSpecificPartOfAsset(id):Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-list/asset/part/' + id
    )
  };

  updatePartOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-list/asset/part/' + data.id + '/update',
      data
    );
  };


  /* Sub Asset Part */

  getAccumulatedPartOfSubAsset(id): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/category/'+ id+'/accumulated' , {params: this.getParam('subasset-accumulated-part-list')}
    )
  };

  getPartListOfSubAsset(id): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/item/' + id
    )
  };

  getSpecificPartOfSubAsset(id):Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/part/' + id
    )
  };

  updatePartOfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/part/' + data.id + '/update',
      data
    );
  };


  addSupplier(): Observable<ResponseBody<any>> {
    let data = {
      companyName: "Coreon",
      address: "Dibord street",
      agentName: "Sara Fathi",
      agentPhoneNumber: "92387623",
      agentEmail: "example@exampple.com"
    }
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/supplier',
      data
    );
  };

  orderList(): Observable<ResponseBody<any>> {
    let data = {
      itemId: 10,
      supplierId: 1,
      price: 1000,
      quantity: 10,
      description: "123",
      hasReminder: false
  }
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/order-list/asset/order',
      data
    );
  };

  recieveAnOrder(): Observable<ResponseBody<any>> {
    let data = {
      warrantyExpireDate: "2024-01-11T07:18:38.111Z",
      quantity: 7,
      price: 11,
      description: "123",
      room: "R1",
      aisle: "A1",
      shelf: "S1",
      box: "B1"
    }
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + '/partstore/order-list/asset/order/5/receive',
      data
    );
  };

}
