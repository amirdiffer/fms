import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { IAssetTrafficFine, ITrafficFine } from '@models/traffic-fine';
import { ResponseBody } from '@models/response-body';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class AssetTrafficFineService {
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
    this.tableFacade.getFiltersByName('trafficFine_asset').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IAssetTrafficFine[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IAssetTrafficFine[]>>(
      environment.baseApiUrl + 'traffic-fine/asset',
      { params: this.getParam('asset-fine') }
    );
  }

  getFinesOfSpecificAsset(id: number): Observable<ResponseBody<any>> {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'traffic-fine/asset/' + id
    );
  }
}
