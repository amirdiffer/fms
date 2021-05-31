import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableFacade } from '@core/table/+state/table.facade';
import { environment } from '@environments/environment';
import { IAssetPolicy } from '@models/asset-policy.model';
import { ResponseBody } from '@models/response-body.model';

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

  loadAll(): Observable<ResponseBody<IAssetPolicy[]>> {
    return this.http.get<ResponseBody<IAssetPolicy[]>>(
      environment.baseApiUrl + 'configuration/asset-policy/sub-asset', {params: this.getParam('asset-policy_subasset')}
    );
  }
  
}
