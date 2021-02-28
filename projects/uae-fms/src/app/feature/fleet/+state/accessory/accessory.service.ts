import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccessoryStateModel } from './accessory.entity';

@Injectable()
export class AccessoryService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IAccessoryStateModel[]> {
    return this.http.get<IAccessoryStateModel[]>('');
  }
}
