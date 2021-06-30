import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovementOverviewStateModel } from './movement-overview.entity';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class MovementOverviewService {
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
    this._tableFacade
      .getFiltersByName('movement_permanent_overview')
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

  loadAll(): Observable<MovementOverviewStateModel[]> {
    this.getFilter();
    return this.http.get<MovementOverviewStateModel[]>(
      environment.baseApiUrl + 'movement/permanent/overview',
      { params: this.getParam('movement_overview') }
    );
  }
}
