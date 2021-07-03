import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/response-body';
import { IUser } from '@models/configuration';
import { environment } from '@environments/environment';
import { IUserStatistics } from '@models/statistics';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class UsersService {
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
    this._tableFacade.getFiltersByName('users').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IUser[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IUser[]>>(
      environment.baseApiUrl + 'configuration/user',
      { params: this.getParam('users') }
    );
  }

  loadAllStatistics(): Observable<ResponseBody<IUserStatistics>> {
    return this.http.get<ResponseBody<IUserStatistics>>(
      environment.baseApiUrl + 'configuration/user/stats'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user',
      data
    );
  }

  editUser(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user/' + data.id + '/update',
      data
    );
  }

  searchEmployee(id) {
    return this.http.get<ResponseBody<IUserStatistics>>(
      environment.baseApiUrl + 'configuration/user/employee/' + id
    );
  }

  getUserById(id) {
    return this.http.get<ResponseBody<IUser>>(
      environment.baseApiUrl + 'configuration/user/' + id
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
