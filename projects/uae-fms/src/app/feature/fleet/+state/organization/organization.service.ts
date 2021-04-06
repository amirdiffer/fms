import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/response-body';
import { IOrganization } from '@models/organization';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class OrganizationService {
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

  loadAll(): Observable<ResponseBody<IOrganization[]>> {
    return this._http.get<ResponseBody<IOrganization[]>>(
      environment.baseApiUrl + 'organization', {params: this.getParam('organization')}
    );
  }
  post(data) : Observable<ResponseBody<IOrganization>>{
    return this._http.post<ResponseBody<IOrganization>> (
      environment.baseApiUrl + 'organization',
      data
    )
  }
  searchDepartment(id) {
    return this._http.get<ResponseBody<IOrganization>>(
      environment.baseApiUrl + 'organization/' + id
    );
  }
}
