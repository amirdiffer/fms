import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { IAccessory, IAccessoryOverview } from '@models/accessory';
import { IAccessoryStatistics } from '@models/statistics';
import { IOwnerShip, IUser } from '@models/configuration';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class AccessoryService {
  constructor(private http: HttpClient, private _tableFacade: TableFacade) {}

  params = new HttpParams();
  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe((x) => {
      if (x != null) {
        this.params = this.params
          .set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAll(): Observable<ResponseBody<IAccessory[]>> {
    return this.http.get<ResponseBody<IAccessory[]>>(
      environment.baseApiUrl + 'accessory',
      { params: this.getParam('accessory') }
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

  getAccessory(id: number): Observable<ResponseBody<IAccessory>> {
    return this.http.get<ResponseBody<IAccessory>>(
      environment.baseApiUrl + `accessory/${id}`
    );
  }

  public users(): Observable<ResponseBody<IUser[]>> {
    return this.http.get<ResponseBody<IUser[]>>(
      environment.baseApiUrl + 'configuration/user'
    );
  }

  loadFullList(): Observable<ResponseBody<IAccessory[]>> {
    return this.http.get<ResponseBody<IAccessory[]>>(
      environment.baseApiUrl + 'accessory?page=0&size=99999999'
    );
  }

  accessoryOverview(): Observable<ResponseBody<IAccessoryOverview>> {
    return this.http.get<ResponseBody<IAccessoryOverview>>(
      environment.baseApiUrl + 'accessory/overview'
    );
  }
}
