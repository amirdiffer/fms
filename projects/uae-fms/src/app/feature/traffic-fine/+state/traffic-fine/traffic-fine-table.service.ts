import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ITrafficFine } from '@models/traffic-fine';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { ITrafficFineStatistics } from '@models/statistics';
import { TableFacade } from '@core/table/+state/table.facade';
import {
  IGetVehicleInfoByChassisNumber,
  IGetVehicleInfoByPlateNumber
} from './traffic-fine-table.entity';
import { ITrafficFineVehicleInfo } from '@models/pending-registration.model';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class TrafficFineTableService {
  params = new HttpParams();

  constructor(
    private http: HttpClient,
    private tableFacade: TableFacade,
    private _tblFilterService: TableFilterService
  ) {}

  getParam(name) {
    this.tableFacade.getPaginationByName(name).subscribe((x) => {
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
    this.tableFacade.getFiltersByName('trafficFine').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<ITrafficFine[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<ITrafficFine[]>>(
      environment.baseApiUrl + 'traffic-fine/traffic-number',
      { params: this.getParam('traffic-fine') }
    );
  }

  loadStatistics(): Observable<ITrafficFineStatistics> {
    // return this.http.get<ITrafficFineStatistics>(
    //   environment.baseApiUrl + 'traffic-fine/stats'
    // );
    return of({
      error: false,
      resultNumber: 1,
      message: {
        deducted: 5,
        paid: 5,
        total: 15,
        unpaid: 5
      }
    });
  }

  getVehicleInformationByPlateNumber(
    data: IGetVehicleInfoByPlateNumber
  ): Observable<ResponseBody<ITrafficFineVehicleInfo>> {
    return this.http.get<ResponseBody<ITrafficFineVehicleInfo>>(
      environment.baseApiUrl +
        `traffic-fine/vehicle-info/plate/${data.plateCategory}/${data.plateCode}/${data.plateNumber}/${data.plateSource}`
    );
  }

  getVehicleInformationByChassisNumber(
    data: IGetVehicleInfoByChassisNumber
  ): Observable<ResponseBody<ITrafficFineVehicleInfo>> {
    return this.http.get<ResponseBody<ITrafficFineVehicleInfo>>(
      environment.baseApiUrl +
        `traffic-fine/vehicle-info/chassis/${data.chassisNumber}`
    );
  }

  getFinesOfSpecificFileNumber(id: number): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'traffic-fine/traffic-number/' + id
    );
  }
}
