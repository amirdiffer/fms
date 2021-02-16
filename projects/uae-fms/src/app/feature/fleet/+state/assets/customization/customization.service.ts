import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomizationModel } from '@feature/fleet/+state/assets/customization/customization.entity';

@Injectable()
export class CustomizationService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ICustomizationModel[]> {
    return this._http.get<ICustomizationModel[]>('');
  }
}
