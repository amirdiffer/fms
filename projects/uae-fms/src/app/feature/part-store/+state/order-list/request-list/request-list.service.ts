import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { tap } from 'rxjs/operators';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class RequestListService {

  params = new HttpParams();

  constructor(private http: HttpClient, private tableFacade: TableFacade) {}

  getParam(name) {
    this.tableFacade.getPaginationByName(name).subscribe(x => {
      if (x != null) {
        this.params = this.params.set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAllAssetRequest(): Observable<ResponseBody<any[]>> {
    return this.http.get<ResponseBody<any[]>>(environment.baseApiUrl + 'partstore/order-list/asset/request',
      { params: this.getParam('request') }).pipe(
        tap(res => {
          console.log(res);
        })
    );
  }

  loadAllSubAssetRequest(): Observable<ResponseBody<any[]>> {
    return this.http.get<ResponseBody<any[]>>(environment.baseApiUrl + 'partstore/order-list/sub-asset/request',
      { params: this.getParam('request') });
  }

  approveAssetRequest(id: any): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl + 'partstore/order-list/asset/request/' + id + '/approve', {});
  }

  approveSubAssetRequest(id: any): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl + 'partstore/order-list/asset/request/' + id + '/approve', {});
  }

  rejectAssetRequest(id: any): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl + 'partstore/order-list/asset/request/' + id + '/reject', {});
  }

  rejectSubAssetRequest(id: any): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl + 'partstore/order-list/asset/request/' + id + '/reject', {});
  }
}
