import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessCategoryStateModel } from './business-category.entity';

@Injectable()
export class BusinessCategoryService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<BusinessCategoryStateModel[]> {
    return this.http.get<BusinessCategoryStateModel[]>('');
  }
}
