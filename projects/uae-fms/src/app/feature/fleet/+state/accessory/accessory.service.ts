import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { IAccessory } from '@models/accessory';
import { IAccessoryStatistics } from '@models/statistics';
import { IOwnerShip, IUser } from '@models/configuration';

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

  getAssetTypes(): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + 'configuration/asset-type?size=999'
    );
  }

  addAccessory(data): Observable<ResponseBody<IAccessory>> {
    return this.http.post<ResponseBody<IAccessory>>(
      environment.baseApiUrl + 'accessory',
      data
    );
  }
  editAccessory(data, id: number): Observable<ResponseBody<IAccessory>> {
    return this.http.post<ResponseBody<IAccessory>>(
      environment.baseApiUrl + `accessory/${id}/update`,
      data
    );
  }

  getAccessory(id: number): Observable<IAccessoryStatistics> {
    return this.http.get<IAccessoryStatistics>(
      environment.baseApiUrl + `accessory/${id}`
    );
  }

  public users(): Observable<ResponseBody<IUser[]>> {
    return this.http.get<ResponseBody<IUser[]>>(
      environment.baseApiUrl + 'configuration/user'
    );
  }
}
