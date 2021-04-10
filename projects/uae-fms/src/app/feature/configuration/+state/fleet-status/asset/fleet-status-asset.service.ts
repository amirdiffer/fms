import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IFleetStatus } from '@models/fleet-status.model';
import { ResponseBody } from '@models/response-body.model';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class FleetStatusAssetService {
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

  loadAll(): Observable<ResponseBody<IFleetStatus[]>> {
    return this.http.get<ResponseBody<IFleetStatus[]>>(
      environment.baseApiUrl + 'configuration/fleet-status', {params: this.getParam('fleet-status')}
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/fleet-status',
      data
    );
  }
}
