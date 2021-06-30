import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IBusinessCategory } from '@models/business-category.model';
import { ResponseBody } from '@models/response-body.model';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class BusinessCategoryService {
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
    this._tableFacade.getFiltersByName('businessCategory').subscribe((x) => {
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

  loadAll(): Observable<ResponseBody<IBusinessCategory[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IBusinessCategory[]>>(
      environment.baseApiUrl + 'configuration/business-category',
      { params: this.getParam('business-category') }
    );
  }

  getOne(id: number): Observable<ResponseBody<IBusinessCategory>> {
    return this.http.get<ResponseBody<IBusinessCategory>>(
      environment.baseApiUrl + 'configuration/business-category/' + id
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/business-category',
      data
    );
  }

  editCategory(data: any, id): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'configuration/business-category/' +
        id +
        '/update',
      data
    );
  }
}
