import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { IAccessory, IAccessoryOverview } from '@models/accessory';
import { IAccessoryStatistics } from '@models/statistics';
import { IOwnerShip, IUser } from '@models/configuration';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class AccessoryService {
  constructor(
    private http: HttpClient,
    private _tableFacade: TableFacade,
    private _tblFilterService: TableFilterService
  ) {}

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

  getFilter() {
    let removeFilterKey = [];
    this._tableFacade.getFiltersByName('accessory').subscribe((x) => {
      let filter = '';
      if (x != null) {
        let value: object[] = x.value ? Object.values(x.value) : [];
        value.forEach((y) => {
          if (y['value'] && y['value'] != '') {
            let filterApiKey = y['filterApiKey']
              ? y['filterApiKey']
              : y['name'];
            if (!removeFilterKey.includes(filterApiKey)) {
              let b = this._tblFilterService.convertData(y);
              filter = filter + b + ';';
            }
          }
        });
      }
      this.params = this.params.set('filter', filter);
    });
  }

  loadAll(): Observable<ResponseBody<IAccessory[]>> {
    this.getFilter();
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
