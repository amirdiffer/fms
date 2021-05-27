import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { ILocation } from '@models/body-shop';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class ServiceShopLocationService {
  constructor(private http: HttpClient, private _tableFacade: TableFacade) {}

  params = new HttpParams();
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

  loadAll(): Observable<ResponseBody<ILocation[]>> {
    return this.http.get<ResponseBody<ILocation[]>>(
      environment.baseApiUrl + 'workshop/serviceshop/location',
      { params: this.getParam('service-shop_location') }
    );
  }
  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/serviceshop/location',
      data
    );
  }

  editLocation(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'workshop/serviceshop/location/' +
        data.id +
        '/update',
      data
    );
  }
  getLocationById(id) {
    return this.http.get<ResponseBody<ILocation>>(
      environment.baseApiUrl + 'workshop/serviceshop/location/' + id
    );
  }
}
