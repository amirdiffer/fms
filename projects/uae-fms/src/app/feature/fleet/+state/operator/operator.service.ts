import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOperator } from '@models/operator';
import { ResponseBody } from '@models/responseBody';
import { IOperatorStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class OperatorService {
  constructor(private http: HttpClient, private _tableFacade: TableFacade) {}

  params = new HttpParams();
  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe(x => {
      if (x != null) {
        this.params = this.params.set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAll(): Observable<ResponseBody<IOperator[]>> {
    return this.http.get<ResponseBody<IOperator[]>>(
      environment.baseApiUrl + 'operator', {params: this.getParam('asset')}
    );
  }

  loadAllStatistics(): Observable<ResponseBody<IOperatorStatistics>> {
    return this.http.get<ResponseBody<IOperatorStatistics>>(
      environment.baseApiUrl + 'configuration/user/stats'
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
}
