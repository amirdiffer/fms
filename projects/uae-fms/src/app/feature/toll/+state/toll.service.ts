import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IToll } from '@models/toll';

@Injectable()
export class TollService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IToll[]>> {
    return this.http.get<ResponseBody<IToll[]>>(
      environment.baseApiUrl + 'toll'
    );
  }
}
