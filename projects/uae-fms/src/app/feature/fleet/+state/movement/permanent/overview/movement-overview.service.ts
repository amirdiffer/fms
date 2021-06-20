import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovementOverviewStateModel } from './movement-overview.entity';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class MovementOverviewService {
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

  loadAll(): Observable<MovementOverviewStateModel[]> {
    return this.http.get<MovementOverviewStateModel[]>(
      environment.baseApiUrl + 'movement/permanent/overview',
      { params: this.getParam('movement_overview') }
    );
  }
}
