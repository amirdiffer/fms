import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOperator, IOperatorDrivingLicense } from '@models/operator';
import { ResponseBody } from '@models/responseBody';
import { IOperatorOverview, IOperatorStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class OperatorService {
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
    this._tableFacade.getFiltersByName('operator').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IOperator[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IOperator[]>>(
      environment.baseApiUrl + 'operator',
      { params: this.getParam('operator') }
    );
  }

  loadAllStatistics(): Observable<ResponseBody<IOperatorStatistics>> {
    return this.http.get<ResponseBody<IOperatorStatistics>>(
      environment.baseApiUrl + 'operator/stats'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user',
      data
    );
  }

  editOperator(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user/' + data.id + '/update',
      data
    );
  }

  searchEmployee(id) {
    return this.http.get<ResponseBody<IOperatorStatistics>>(
      environment.baseApiUrl + 'configuration/user/employee/' + id
    );
  }
  getOperatorById(id) {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user/' + id
    );
  }

  operatorOverview(): Observable<ResponseBody<IOperatorOverview>> {
    return this.http.get<ResponseBody<IOperatorOverview>>(
      environment.baseApiUrl + 'operator/overview'
    );
  }

  getOperatorsDrivingLicence(
    id: number
  ): Observable<ResponseBody<IOperatorDrivingLicense>> {
    return this.http.get<ResponseBody<IOperatorDrivingLicense>>(
      environment.baseApiUrl + 'operator/' + id + '/driver-license'
    );
  }
}
