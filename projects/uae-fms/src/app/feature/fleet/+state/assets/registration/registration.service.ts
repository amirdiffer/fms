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

@Injectable()
export class RegistrationService {
  constructor(private _http: HttpClient, private _tableFacade: TableFacade) {}

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

  loadAll(): Observable<ResponseBody<IPendingRegistration[]>> {
    return this._http.get<ResponseBody<IPendingRegistration[]>>(
      environment.baseApiUrl + 'asset/registration'
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
