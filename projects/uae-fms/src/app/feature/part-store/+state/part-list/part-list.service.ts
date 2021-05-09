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

  getPartOfAsset(id): Observable<ResponseBody<any>>{
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

  getPartOfSubAsset(id): Observable<ResponseBody<any>>{
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

}
