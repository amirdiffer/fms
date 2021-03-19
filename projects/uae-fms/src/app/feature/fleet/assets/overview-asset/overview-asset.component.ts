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

  filterSetting_BusinessCategory = [
    {
      filterTitle: 'statistic.calendar',
      isCalendar: true,
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.item',
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.asset',
      filterSupTitle: 'statistic.item',
      filterCount: '08',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.sub_asset',
      filterSupTitle: 'statistic.item',
      filterCount: '02',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.accessory',
      filterSupTitle: 'statistic.item',
      filterCount: '09',
      filterTagColor: '#F75A4A'
    }
  ];

  filterSetting_Request = [
    {
      filterTitle: 'statistic.calendar',
      isCalendar: true,
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.technical_report',
      filterSupTitle: 'statistic.issue_type',
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.repair',
      filterSupTitle: 'statistic.issue_type',
      filterCount: '08',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.estimate',
      filterSupTitle: 'statistic.issue_type',
      filterCount: '02',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.installation',
      filterSupTitle: 'statistic.issue_type',
      filterCount: '09',
      filterTagColor: '#F75A4A'
    }
  ];

  filterSetting_Job_Card = [
    {
      filterTitle: 'statistic.calendar',
      isCalendar: true,
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.tasks',
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.not_started',
      filterSupTitle: 'statistic.tasks',
      filterCount: '08',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.started',
      filterSupTitle: 'statistic.tasks',
      filterCount: '02',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.closed',
      filterSupTitle: 'statistic.tasks',
      filterCount: '09',
      filterTagColor: '#F75A4A'
    }
  ];

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

  activeTab = 'Overview';
  selectedTab(event: string) {
    console.log(event);
    this.activeTab = event;
  }
}