import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { IAccessory } from '@models/accessory';
import { IAccessoryStatistics } from '@models/statistics';

@Injectable()
export class AccessoryService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IAccessory[]>> {
    return this.http.get<ResponseBody<IAccessory[]>>(
      environment.baseApiUrl + 'accessory'
    );
  }

  loadStatistics(): Observable<IAccessoryStatistics> {
    return this.http.get<IAccessoryStatistics>(
      environment.baseApiUrl + 'accessory/stats'
    );
  }
}
