import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITechnician } from '@models/body-shop';
import { ResponseBody } from '@models/response-body';
import { environment } from '@environments/environment';

@Injectable()
export class BodyShopTechnicianService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<ITechnician[]>> {
    return this.http.get<ResponseBody<ITechnician[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/technician'
    );
  }
}
