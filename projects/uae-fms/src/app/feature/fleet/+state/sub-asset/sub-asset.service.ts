import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubasset } from '@models/sub-asset';
import { ResponseBody } from '@models/response-body';
import { environment } from '@environments/environment';

@Injectable()
export class SubAssetService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<ISubasset[]>> {
    return this.http.get<ResponseBody<ISubasset[]>>(
      environment.baseApiUrl + 'sub-asset'
    );
  }
}
