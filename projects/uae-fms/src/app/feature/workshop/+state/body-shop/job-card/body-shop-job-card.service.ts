import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { IJobCard } from '@models/body-shop';

@Injectable()
export class BodyShopJobCardService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IJobCard[]>> {
    return this.http.get<ResponseBody<IJobCard[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/jobcard'
    );
  }
  post(data, assetId): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/jobcard/asset/' + assetId,
      data
    );
  }

  editJobCard(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'workshop/bodyshop/jobcard/' +
        data.id +
        '/update',
      data
    );
  }
  getJobCardById(id) {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/jobcard/' + id
    );
  }
}
