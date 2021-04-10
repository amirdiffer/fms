import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TableService {
  constructor(private http: HttpClient) {}

}
