import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class OperatorMovementHistoryService {

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

  loadAll(id: number): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<any>>(environment.baseApiUrl + 'operator/' + id + '/movement/temporary');
  }
}
