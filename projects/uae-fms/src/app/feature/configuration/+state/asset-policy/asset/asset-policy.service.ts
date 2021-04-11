import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body.model';
import { IAssetPolicy } from '@models/asset-policy.model';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class AssetPolicyService {
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
      environment.baseApiUrl + 'configuration/asset-policy/asset', {params: this.getParam('asset-policy_asset')}
    );
  }
  postAssetPolicy(data): Observable<ResponseBody<IAssetPolicy>> {
    return this.http.post<ResponseBody<IAssetPolicy>>(
      environment.baseApiUrl + 'configuration/asset-policy',
      data
    );
  }

  updateAssetPolicy(data): Observable<ResponseBody<IAssetPolicy>> {
    return this.http.post<ResponseBody<IAssetPolicy>>(
      environment.baseApiUrl + `configuration/asset-policy/${data.id}/update`,
      data
    );
  }
}
