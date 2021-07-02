import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IPendingCustomization } from '@models/pending-customization.model';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class CustomizationService {
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
    this._tableFacade
      .getFiltersByName('pendingCustomization')
      .subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IPendingCustomization[]>> {
    this.getFilter();
    return this._http.get<ResponseBody<IPendingCustomization[]>>(
      environment.baseApiUrl + 'asset/customization',
      { params: this.getParam('asset_customization') }
    );
  }

  compelete(data, id) {
    return this._http.post(
      environment.baseApiUrl + `asset/${id}/customization`,
      data
    );
  }

  getAssetForCustomizationByAssetId(id) {
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'asset/' + id + '/customization'
    );
  }
}
