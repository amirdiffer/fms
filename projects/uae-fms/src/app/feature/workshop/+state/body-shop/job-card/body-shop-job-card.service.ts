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
}
