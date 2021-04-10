import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IPendingRegistration } from '@models/pending-registration.model';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class RegistrationService {
  constructor(private _http: HttpClient, private _tableFacade: TableFacade) {}

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

  loadAll(): Observable<ResponseBody<IPendingRegistration[]>> {
    return this._http.get<ResponseBody<IPendingRegistration[]>>(
      environment.baseApiUrl + 'asset/registration'
    );
  }
  registerAsset(data):Observable<ResponseBody<any>>{
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + '/asset/'+data.id+'/register',
      data
    )
  }
}
