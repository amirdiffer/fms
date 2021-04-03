import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { ILocation } from '@models/body-shop';

@Injectable()
export class BodyShopLocationService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<ILocation[]>> {
    return this.http.get<ResponseBody<ILocation[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/location'
    );
  }
  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/location',
      data
    );
  }

  editLocation(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'workshop/bodyshop/location/' +
        data.id +
        '/update',
      data
    );
  }
  getLocationById(id) {
    return this.http.get<ResponseBody<ILocation>>(
      environment.baseApiUrl + 'workshop/bodyshop/location' + id
    );
  }
}
