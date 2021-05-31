import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOperatorTrafficFine } from '@models/operator';
import { ResponseBody } from '@models/responseBody';
import { IOperatorStatistics } from '@models/statistics';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class OperatorTrafficFineService {

  params = new HttpParams();

  constructor(private http: HttpClient, private _tableFacade: TableFacade) {
  }

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

  loadAll(id: number): Observable<ResponseBody<IOperatorTrafficFine[]>> {
    return this.http.get<ResponseBody<IOperatorTrafficFine[]>>(environment.baseApiUrl + 'operator/' + id + '/traffic-fine');
  }

  loadAllStatistics(): Observable<ResponseBody<IOperatorStatistics>> {
    return this.http.get<ResponseBody<IOperatorStatistics>>(
      environment.baseApiUrl + 'operator/stats'
    );
  }
}
