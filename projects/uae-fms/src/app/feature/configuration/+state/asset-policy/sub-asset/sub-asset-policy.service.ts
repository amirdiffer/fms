import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubAssetPolicyStateModel } from './sub-asset-policy.entity';
import { TableFacade } from '@core/table/+state/table.facade';
import { environment } from '@environments/environment';

@Injectable()
export class SubAssetPolicyService {
  constructor(private http: HttpClient, private _tableFacade: TableFacade) {}

  params = new HttpParams();
  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe(x => {
      if (x != null) {
        this.params = this.params.set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAll(): Observable<SubAssetPolicyStateModel[]> {
    return this.http.get<SubAssetPolicyStateModel[]>(
      environment.baseApiUrl + '', {params: this.getParam('asset-policy_subasset')}
    );
  }
}
