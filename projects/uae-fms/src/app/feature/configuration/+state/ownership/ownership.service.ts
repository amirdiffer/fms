import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOwnerShip } from '@models/configuration';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class OwnershipService {
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
    this._tableFacade.getFiltersByName('ownership').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IOwnerShip[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IOwnerShip[]>>(
      environment.baseApiUrl + 'configuration/ownership',
      { params: this.getParam('ownership') }
    );
  }

  getByID(id): Observable<ResponseBody<IOwnerShip[]>> {
    return this.http.get<ResponseBody<IOwnerShip[]>>(
      environment.baseApiUrl + 'configuration/ownership/' + id
    );
  }

  addOwnership(data): Observable<ResponseBody<IOwnerShip>> {
    return this.http.post<ResponseBody<IOwnerShip>>(
      environment.baseApiUrl + 'configuration/ownership',
      data
    );
  }

  editOwnership(data): Observable<ResponseBody<IOwnerShip>> {
    return this.http.post<ResponseBody<IOwnerShip>>(
      environment.baseApiUrl + 'configuration/ownership/' + data.id + '/update',
      data
    );
  }
}
