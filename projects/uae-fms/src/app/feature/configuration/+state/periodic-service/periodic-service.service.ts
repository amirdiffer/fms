import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IPeriodicService, ISpecificPeriodicService } from '@models/configuration';
import { ResponseBody } from '@models/response-body';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class PeriodicServiceService {
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

  loadAll(): Observable<ResponseBody<IPeriodicService[]>> {
    return this.http.get<ResponseBody<IPeriodicService[]>>(
      environment.baseApiUrl + 'configuration/periodic-service', {params: this.getParam('periodic-service')}
    );
  }

  getById(id: number) : Observable<ResponseBody<ISpecificPeriodicService>>{
    return this.http.get<ResponseBody<ISpecificPeriodicService>>(
      environment.baseApiUrl + `configuration/periodic-service/${id}`
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/periodic-service',
      data
    );
  }

  update(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'configuration/periodic-service/' +
        data.id +
        '/update',
      data
    );
  }
}
