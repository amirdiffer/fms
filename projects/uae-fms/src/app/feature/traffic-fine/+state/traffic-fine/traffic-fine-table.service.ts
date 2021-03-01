import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITrafficFine } from '@models/traffic-fine';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';

@Injectable()
export class TrafficFineTableService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<ITrafficFine[]>> {
    return this.http.get<ResponseBody<ITrafficFine[]>>(
      environment.baseApiUrl + 'traffic-fine'
    );
  }
}
