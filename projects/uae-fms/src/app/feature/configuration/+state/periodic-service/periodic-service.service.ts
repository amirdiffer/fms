import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import {
  IPeriodicService,
  ISpecificPeriodicService
} from '@models/configuration';
import { ResponseBody } from '@models/response-body';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class PeriodicServiceService {
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
    this._tableFacade.getFiltersByName('periodicService').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IPeriodicService[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IPeriodicService[]>>(
      environment.baseApiUrl + 'configuration/periodic-service',
      { params: this.getParam('periodic-service') }
    );
  }

  getById(id: number): Observable<ResponseBody<ISpecificPeriodicService>> {
    return this.http.get<ResponseBody<ISpecificPeriodicService>>(
      environment.baseApiUrl + `configuration/periodic-service/${id}`
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/periodic-service',
      data
    );
  }

  update(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'configuration/periodic-service/' +
        data.id +
        '/update',
      data
    );
  }
}
