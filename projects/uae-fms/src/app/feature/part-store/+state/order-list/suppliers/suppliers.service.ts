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

  loadAll(): Observable<any[]> {
    return this._http.get<any[]>('');
  }

  loadAllSupplier(): Observable<ResponseBody<any[]>> {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/supplier', { params: this.getParam('supplier') }
    );
  }

  addSupplier(data: any): Observable<any> {
    return this._http.post(environment.baseApiUrl + 'partstore/supplier', data);
  }
}
