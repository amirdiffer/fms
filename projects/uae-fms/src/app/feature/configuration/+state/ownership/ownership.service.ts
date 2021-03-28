import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnershipStateModel } from './ownership.entity';

@Injectable()
export class OwnershipService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<OwnershipStateModel[]> {
    return this.http.get<OwnershipStateModel[]>('');
  }
}
