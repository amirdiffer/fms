import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITechnician } from '@models/body-shop';
import { ResponseBody } from '@models/response-body';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class BodyShopTechnicianService {
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

  loadAll(): Observable<ResponseBody<ITechnician[]>> {
    return this.http.get<ResponseBody<ITechnician[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/technician', {params: this.getParam('body-shop_technician')}
    );
  }
  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/technician',
      data
    );
  }

  editTechnician(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'workshop/bodyshop/technician/' +
        data.id +
        '/update',
      data
    );
  }
  getTechnicianById(id) {
    return this.http.get<ResponseBody<ITechnician>>(
      environment.baseApiUrl + 'workshop/bodyshop/technician/' + id
    );
  }
}
