import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class SuppliersService {

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

  /* '''''Load''''' Supplier */
  loadAllSupplier(): Observable<ResponseBody<any[]>> {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/supplier', { params: this.getParam('supplier-list') }
    );
  }


  /* ''''''Add'''''' Supplier */
  addSupplier(data: any): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(environment.baseApiUrl + 'partstore/supplier', data);
  }



  /* '''''Get''''' Specific Supplier */
  getSpecificSupplier(id):Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/supplier/' + id
    );
  };



  /* '''''Update''''' Supplier*/
  updateSupplier(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/supplier/' + data.id + '/update',
      data
    );
  };
}
