import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/response-body';
import { IRequest } from '@models/body-shop';
import { environment } from '@environments/environment';
import { IBodyShopRequestStatistics } from '@models/statistics';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class BodyShopRequestService {
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

  loadAll(): Observable<ResponseBody<any[]>> {
    return this.http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/asset/request', {params: this.getParam('body-shop_request')}
    );
  }

  requestsById(data): Observable<ResponseBody<any[]>> {
    return this.http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + `workshop/bodyshop/asset/${data}/request`
    );
  }

  loadStatistics(): Observable<IBodyShopRequestStatistics> {
    return this.http.get<IBodyShopRequestStatistics>(
      environment.baseApiUrl + 'workshop/bodyshop/stats'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/request',
      data
    );
  }
  editRequest(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/issue' + data.id + '/update',
      data
    );
  }
  getRequestById(id) {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/body-shop/issue' + id
    );
  }
}
