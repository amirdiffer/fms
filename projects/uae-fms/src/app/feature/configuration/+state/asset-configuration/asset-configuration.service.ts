import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IAssetType } from '@models/asset-type.model';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class AssetConfigurationService {
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

  loadAll(): Observable<ResponseBody<IAssetType[]>> {
    return this.http.get<ResponseBody<IAssetType[]>>(
      environment.baseApiUrl + 'configuration/asset-type', {params: this.getParam('asset-configuration')}
      );
  }
}
