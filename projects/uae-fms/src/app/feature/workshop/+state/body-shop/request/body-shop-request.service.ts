import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/response-body';
import { IRequest } from '@models/body-shop';
import { environment } from '@environments/environment';
import { IBodyShopRequestStatistics } from '@models/statistics';

@Injectable()
export class BodyShopRequestService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IRequest[]>> {
    return this.http.get<ResponseBody<IRequest[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/issue/type/:type'
    );
  }
  loadStatistics(): Observable<IBodyShopRequestStatistics> {
    return this.http.get<IBodyShopRequestStatistics>(
      environment.baseApiUrl + 'workshop/bodyshop/stats'
    );
  }
}
