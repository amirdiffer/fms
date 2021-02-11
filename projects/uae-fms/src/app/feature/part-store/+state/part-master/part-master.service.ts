import { PartMasterStateModel } from './part-master.entity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PartMasterService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<PartMasterStateModel[]> {
    return this.http.get<PartMasterStateModel[]>('');
  }
}
