import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IAssetTrafficFine } from '@models/traffic-fine';
import { ResponseBody } from '@models/response-body';

@Injectable()
export class AssetTrafficFineService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IAssetTrafficFine[]>> {
    return this.http.get<ResponseBody<IAssetTrafficFine[]>>(
      environment.baseApiUrl + 'traffic-fine/asset'
    );
  }
}
