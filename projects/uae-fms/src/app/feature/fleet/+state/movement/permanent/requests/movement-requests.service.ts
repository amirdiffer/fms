import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovementRequest } from '@models/movement';
import { ResponseBody } from '@models/responseBody';
import { IMovementStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class MovementRequestsService {
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
      .getFiltersByName('movement_permanent_request')
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

  loadAll(): Observable<ResponseBody<IMovementRequest[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IMovementRequest[]>>(
      environment.baseApiUrl + 'movement/permanent/request',
      { params: this.getParam('movement_request') }
    );
  }

  loadRequestStatistic(): Observable<ResponseBody<IMovementStatistics>> {
    return this.http.get<ResponseBody<IMovementStatistics>>(
      environment.baseApiUrl + 'movement/stats'
    );
  }

  addMovementRequest(data): Observable<ResponseBody<IMovementRequest>> {
    return this.http.post<ResponseBody<IMovementRequest>>(
      environment.baseApiUrl + 'movement/request',
      data
    );
  }
  editMovementRequest(data): Observable<ResponseBody<IMovementRequest>> {
    return this.http.post<ResponseBody<IMovementRequest>>(
      environment.baseApiUrl + 'movement/request',
      data
    );
  }

  rejectRequest(data): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'movement/request/' + data + '/reject'
    );
  }

  assignRequest(id, data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'movement/request/' + id + '/assign',
      data
    );
  }
}
