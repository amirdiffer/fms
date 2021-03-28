import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersStateModel } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<UsersStateModel[]> {
    return this.http.get<UsersStateModel[]>('');
  }
}
