import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAuctionListModel } from './auction-list.entity';
import { environment } from '@environments/environment';

@Injectable()
export class AuctionListService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<IAuctionListModel[]> {
    //return this._http.get<IAuctionListModel[]>(
     // environment.baseApiUrl + 'workshop/bodyshop/technician'
    //);
    let data = [
      {
        id: 1,
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: true
      },
      {
        id: 2,
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: false
      },
      {
        id: 3,
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: false
      },
      {
        id: 4,
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: true
      },
      {
        id: 5,
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: true
      },
      {
        id: 6,
        statusColor: '#7F87CA',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        createdBy: 'Automatic',
        reason: 'Out Of Policy',
        assignment: 'Sam Smith, Sam Smith',
        estimatedMarket: '1111111 AED',
        date: '02/02/2020',
        location: 'Bardubai, Dubai',
        removeItem: true
      }
    ]
    return of(data)
  }

}
