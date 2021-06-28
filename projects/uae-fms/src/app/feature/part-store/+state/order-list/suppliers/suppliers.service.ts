import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class SuppliersService {
  params = new HttpParams();

  constructor(
    private _http: HttpClient,
    private tableFacade: TableFacade,
    private _tblFilterService: TableFilterService
  ) {}

  getParam(name) {
    this.tableFacade.getPaginationByName(name).subscribe((x) => {
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
    this.tableFacade.getFiltersByName('partStore_suppliers').subscribe((x) => {
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

  /* '''''Load''''' Supplier */
  loadAllSupplier(): Observable<ResponseBody<any[]>> {
    this.getFilter();
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/supplier',
      { params: this.getParam('supplier-list') }
    );
  }

  /* ''''''Add'''''' Supplier */
  addSupplier(data: any): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/supplier',
      data
    );
  }

  /* '''''Get''''' Specific Supplier */
  getSpecificSupplier(id): Observable<ResponseBody<any>> {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/supplier/' + id
    );
  }

  /* '''''Update''''' Supplier*/
  updateSupplier(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/supplier/' + data.id + '/update',
      data
    );
  }
}
