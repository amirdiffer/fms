import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITechnician } from '@models/body-shop';
import { ResponseBody } from '@models/response-body';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class ServiceShopTechnicianService {
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
    let removeFilterKey = [];
    this._tableFacade
      .getFiltersByName('serviceShop_technician')
      .subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<ITechnician[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<ITechnician[]>>(
      environment.baseApiUrl + 'workshop/serviceshop/technician',
      { params: this.getParam('body-shop_technician') }
    );
  }
  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/serviceshop/technician',
      data
    );
  }

  editTechnician(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'workshop/serviceshop/technician/' +
        data.id +
        '/update',
      data
    );
  }
  getTechnicianById(id) {
    return this.http.get<ResponseBody<ITechnician>>(
      environment.baseApiUrl + 'workshop/serviceshop/technician/' + id
    );
  }

  uploadDoc(data: FormData) {
    return this.http.post(environment.baseApiUrl + 'document', data, {
      headers: new HttpHeaders({}),
      reportProgress: true,
      observe: 'events'
    });
  }
}
