import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IPendingRegistration } from '@models/pending-registration.model';
import { TableFacade } from '@core/table/+state/table.facade';
import {
  IRegisterAssetByChassisNumber,
  IRegisterAssetByPlateNumber
} from './registration.entity';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class RegistrationService {
  constructor(
    private _http: HttpClient,
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
    this._tableFacade.getFiltersByName('pendingRegistration').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IPendingRegistration[]>> {
    this.getFilter();
    return this._http.get<ResponseBody<IPendingRegistration[]>>(
      environment.baseApiUrl + 'asset/registration',
      { params: this.getParam('asset_registration') }
    );
  }
  registerAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + data.id + '/register',
      data
    );
  }
  editRegister(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/register/' + data.id + '/update',
      data
    );
  }
  getRegisterById(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/register/' + id
    );
  }

  getAssetForRegistrationByAssetId(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/summary/registration'
    );
  }

  /* Register an Asset by plate number */
  registerByPlateNumber(
    data: IRegisterAssetByPlateNumber
  ): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        `asset/${data.id}/register/plate/${data.plateCategory}/${data.plateCode}/${data.plateNumber}/${data.plateSource}`,
      { fuelTag: data.fuelTag, tollTag: data.tollTag }
    );
  }

  /* Register an Asset by chassis number */
  registerByChasisNumber(
    data: IRegisterAssetByChassisNumber
  ): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        `asset/${data.id}/register/chassis/${data.chassisNumber}`,
      { fuelTag: data.fuelTag, tollTag: data.tollTag }
    );
  }
}
