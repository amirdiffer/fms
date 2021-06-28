import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '@models/configuration';
import { ResponseBody } from '@models/response-body';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class RolePermissionService {
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
    this._tableFacade.getFiltersByName('rolePermission').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IRole[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IRole[]>>(
      environment.baseApiUrl + 'configuration/role',
      { params: this.getParam('rolePermission') }
    );
  }
  addNewRole(data): Observable<ResponseBody<IRole>> {
    return this.http.post<ResponseBody<IRole>>(
      environment.baseApiUrl + 'configuration/role',
      data
    );
  }

  updateRole(data): Observable<ResponseBody<IRole>> {
    return this.http.post<ResponseBody<IRole>>(
      environment.baseApiUrl + 'configuration/role/' + data.id + '/update',
      data
    );
  }

  getRoleByRoleID(roleId) {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/role/' + roleId
    );
  }
}
