import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOwnerShip } from '@models/configuration';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class OwnershipService {
  constructor(private http: HttpClient, private _tableFacade: TableFacade) { }

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

  loadAll(): Observable<ResponseBody<IOwnerShip[]>> {
    return this.http.get<ResponseBody<IOwnerShip[]>>(
      environment.baseApiUrl + 'configuration/ownership', { params: this.getParam('ownership') }
    );
  }

  getByID(id): Observable<ResponseBody<IOwnerShip[]>> {
    return this.http.get<ResponseBody<IOwnerShip[]>>(
      environment.baseApiUrl + 'configuration/ownership/' + id
    );
  }

  addOwnership(data): Observable<ResponseBody<IOwnerShip>> {
    return this.http.post<ResponseBody<IOwnerShip>>(
      environment.baseApiUrl + 'configuration/ownership',
      data
    );
  }

  editOwnership(data): Observable<ResponseBody<IOwnerShip>> {
    console.log(data)
    return this.http.post<ResponseBody<IOwnerShip>>(
      environment.baseApiUrl + 'configuration/ownership/' + data.id + '/update',
      data
    );
  }
}
