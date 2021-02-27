import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IAssetTrafficFine } from '@models/traffic-fine';

@Injectable()
export class AssetTrafficFineService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IAssetTrafficFine[]> {
    return this.http.get<IAssetTrafficFine[]>(
      environment.baseApiUrl + 'traffic-fine/asset'
    );
  }
}
