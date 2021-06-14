import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { IAssetTrafficFine, ITrafficFine } from '@models/traffic-fine';
import { ResponseBody } from '@models/response-body';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class AssetTrafficFineService {

  params = new HttpParams();

  constructor(private http: HttpClient, private tableFacade: TableFacade) {}

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

  loadAll(): Observable<ResponseBody<IAssetTrafficFine[]>> {
    return this.http.get<ResponseBody<IAssetTrafficFine[]>>(
      environment.baseApiUrl + 'traffic-fine/asset',
      { params: this.getParam('asset-fine') }
    );
  }
}
