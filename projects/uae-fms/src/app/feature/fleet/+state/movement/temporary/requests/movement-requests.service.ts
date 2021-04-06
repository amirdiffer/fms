import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovementRequest } from '@models/movement';
import { ResponseBody } from '@models/responseBody';
import { IMovementStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class MovementRequestsServiceTemporary {
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

  loadAll(): Observable<ResponseBody<IMovementRequest[]>> {
    return this.http.get<ResponseBody<IMovementRequest[]>>(
      environment.baseApiUrl + 'movement/temporary/request', {params: this.getParam('temporary_movement_request')}
    );
  }

  loadRequestStatistic(): Observable<IMovementStatistics> {
    return this.http.get<IMovementStatistics>(
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
