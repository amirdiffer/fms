import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/response-body';
import { IOrganization } from '@models/organization';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { ITrafficFine } from '@models/traffic-fine';
import { IMovementOverView } from '@feature/fleet/movement/movement.model';
import { IUser } from '@models/configuration';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class OrganizationService {
  constructor(
    private _http: HttpClient,
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
    this._tableFacade.getFiltersByName('organization').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IOrganization[]>> {
    this.getFilter();
    return this._http.get<ResponseBody<IOrganization[]>>(
      environment.baseApiUrl + 'organization',
      { params: this.getParam('organization') }
    );
  }
  post(data): Observable<ResponseBody<IOrganization>> {
    return this._http.post<ResponseBody<IOrganization>>(
      environment.baseApiUrl + 'organization',
      data
    );
  }
  edit(data): Observable<ResponseBody<IOrganization>> {
    return this._http.post<ResponseBody<IOrganization>>(
      environment.baseApiUrl + 'organization/' + data.id + '/update',
      data
    );
  }
  searchDepartment(id) {
    return this._http.get<ResponseBody<IOrganization>>(
      environment.baseApiUrl + 'organization/' + id
    );
  }

  usersOfOrganization(id) {
    return this._http.get<ResponseBody<IUser[]>>(
      environment.baseApiUrl + 'organization/' + id + '/user'
    );
  }

  trafficFineOfOrganization(id) {
    return this._http.get<ResponseBody<ITrafficFine[]>>(
      environment.baseApiUrl + 'organization/' + id + '/traffic-fine'
    );
  }

  movementHistoryOfOrganization(id) {
    return this._http.get<ResponseBody<IMovementOverView[]>>(
      environment.baseApiUrl + 'organization/' + id + '/movement/temporary'
    );
  }

  loadWithPagination(
    page: number = 0,
    sort: string = 'createdAt,desc',
    size: number = 10000
  ): Observable<ResponseBody<IOrganization[]>> {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('sort', sort);
    params = params.append('size', `${size}`);
    return this._http.get<ResponseBody<IOrganization[]>>(
      environment.baseApiUrl + 'organization',
      { params: params }
    );
  }

  userStatsByOrganizationId(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'organization/' + id + '/stats/user'
    );
  }

  trafficFineStatsByOrganizationId(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'organization/' + id + '/stats/traffic-fine'
    );
  }
}
