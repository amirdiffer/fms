import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITechnicalInspectionModel } from './technical-inspections.entity';

@Injectable()
export class TechnicalInspectionService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ITechnicalInspectionModel[]> {
    return this._http.get<ITechnicalInspectionModel[]>('');
  }
}
