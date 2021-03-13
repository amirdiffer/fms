import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: 'overview-asset.component.html',
  styleUrls: ['./overview-asset.component.scss']
})
export class OverViewAssetComponent implements OnInit, OnDestroy {
  onDestroy = new Subject();
  vehicles = [
    {
      id: 1,
      make: 'bmw.png',
      vehicle: 'Request No 123456',
      thumb: 'thumb1.png',
      type: 'bmw',
      model: 'I3',
      plateno: '1234',
      iserve: '04',
      status: '1',
      location: 'Al Ghandi Ato Service Ras A Khor',
      bodyType: 'Text Type',
      color: 'Text Type',
      trim: 'Text Type',
      group: 'Text Type',
      department: 'Dep Name-Area-Dubai',
      licensePlate: '123456',
      operator: 'User Name',
      salik: 'Assign',
      warranty: 'Under Warranty',
      vin_sn: 'JTDKBRFU9J30593O7',
      year: '2020'
    },
    {
      id: 2,
      make: 'bmw.png',
      vehicle: 'Request No 123456',
      thumb: 'thumb1.png',
      type: 'bmw',
      model: 'I3',
      plateno: '1234',
      iserve: '04',
      status: '1',
      location: 'Al Ghandi Ato Service Ras A Khor',
      bodyType: 'Text Type',
      color: 'Text Type',
      trim: 'Text Type',
      group: 'Text Type',
      department: 'Dep Name-Area-Dubai',
      licensePlate: '123456',
      operator: 'User Name',
      salik: 'Assign',
      warranty: 'Under Warranty',
      vin_sn: 'JTDKBRFU9J30593O7',
      year: '2020'
    },
    {
      id: 3,
      make: 'bmw.png',
      vehicle: 'Request No 123456',
      thumb: 'thumb1.png',
      type: 'bmw',
      model: 'I3',
      plateno: '1234',
      iserve: '04',
      status: '1',
      location: 'Al Ghandi Ato Service Ras A Khor',
      bodyType: 'Text Type',
      color: 'Text Type',
      trim: 'Text Type',
      group: 'Text Type',
      department: 'Dep Name-Area-Dubai',
      licensePlate: '123456',
      operator: 'User Name',
      salik: 'Assign',
      warranty: 'Under Warranty',
      vin_sn: 'JTDKBRFU9J30593O7',
      year: '2020'
    },
    {
      id: 4,
      make: 'bmw.png',
      vehicle: 'Request No 123456',
      thumb: 'thumb1.png',
      type: 'bmw',
      model: 'I3',
      plateno: '1234',
      iserve: '04',
      status: '1',
      location: 'Al Ghandi Ato Service Ras A Khor',
      bodyType: 'Text Type',
      color: 'Text Type',
      trim: 'Text Type',
      group: 'Text Type',
      department: 'Dep Name-Area-Dubai',
      licensePlate: '123456',
      operator: 'User Name',
      salik: 'Assign',
      warranty: 'Under Warranty',
      vin_sn: 'JTDKBRFU9J30593O7',
      year: '2020'
    },
    {
      id: 5,
      make: 'bmw.png',
      vehicle: 'Request No 123456',
      thumb: 'thumb1.png',
      type: 'bmw',
      model: 'I3',
      plateno: '1234',
      iserve: '04',
      status: '1',
      location: 'Al Ghandi Ato Service Ras A Khor',
      bodyType: 'Text Type',
      color: 'Text Type',
      trim: 'Text Type',
      group: 'Text Type',
      department: 'Dep Name-Area-Dubai',
      licensePlate: '123456',
      operator: 'User Name',
      salik: 'Assign',
      warranty: 'Under Warranty',
      vin_sn: 'JTDKBRFU9J30593O7',
      year: '2020'
    },
    {
      id: 6,
      make: 'bmw.png',
      vehicle: 'Request No 123456',
      thumb: 'thumb1.png',
      type: 'bmw',
      model: 'I3',
      plateno: '1234',
      iserve: '04',
      status: '1',
      location: 'Al Ghandi Ato Service Ras A Khor',
      bodyType: 'Text Type',
      color: 'Text Type',
      trim: 'Text Type',
      group: 'Text Type',
      department: 'Dep Name-Area-Dubai',
      licensePlate: '123456',
      operator: 'User Name',
      salik: 'Assign',
      warranty: 'Under Warranty',
      vin_sn: 'JTDKBRFU9J30593O7',
      year: '2020'
    },
    {
      id: 7,
      make: 'bmw.png',
      vehicle: 'Request No 123456',
      thumb: 'thumb1.png',
      type: 'bmw',
      model: 'I3',
      plateno: '1234',
      iserve: '04',
      status: '1',
      location: 'Al Ghandi Ato Service Ras A Khor',
      bodyType: 'Text Type',
      color: 'Text Type',
      trim: 'Text Type',
      group: 'Text Type',
      department: 'Dep Name-Area-Dubai',
      licensePlate: '123456',
      operator: 'User Name',
      salik: 'Assign',
      warranty: 'Under Warranty',
      vin_sn: 'JTDKBRFU9J30593O7',
      year: '2020'
    },
    {
      id: 8,
      make: 'bmw.png',
      vehicle: 'Request No 123456',
      thumb: 'thumb1.png',
      type: 'bmw',
      model: 'I3',
      plateno: '1234',
      iserve: '04',
      status: '1',
      location: 'Al Ghandi Ato Service Ras A Khor',
      bodyType: 'Text Type',
      color: 'Text Type',
      trim: 'Text Type',
      group: 'Text Type',
      department: 'Dep Name-Area-Dubai',
      licensePlate: '123456',
      operator: 'User Name',
      salik: 'Assign',
      warranty: 'Under Warranty',
      vin_sn: 'JTDKBRFU9J30593O7',
      year: '2020'
    }
  ];

  vehicle = {
    id: 1,
    make: 'bmw.png',
    vehicle: 'Request No 123456',
    thumb: 'thumb1.png',
    type: 'bmw',
    model: 'I3',
    plateno: '1234',
    iserve: '04',
    status: '1',
    location: 'Al Ghandi Ato Service Ras A Khor',
    bodyType: 'Text Type',
    color: 'Text Type',
    trim: 'Text Type',
    group: 'Text Type',
    department: 'Dep Name-Area-Dubai',
    licensePlate: '123456',
    operator: 'User Name',
    salik: 'Assign',
    warranty: 'Under Warranty',
    vin_sn: 'JTDKBRFU9J30593O7',
    year: '2020'
  };

  vehicleId = null;
  activeButton = 1;
  fileServerBaseUrl = environment.baseFileServer;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.url.pipe(takeUntil(this.onDestroy)).subscribe((x) => {
      this.vehicleId = +x[1].path.split('-')[1];
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  selectedTab($event) {
    console.log($event);
  }
}
