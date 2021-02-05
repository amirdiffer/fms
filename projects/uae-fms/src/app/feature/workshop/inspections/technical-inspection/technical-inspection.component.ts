import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { MakeDecisionService } from './make-decision/make-decision.service';
import { TechnicalInspectionFacade } from '@feature/workshop/+state/technical-inspections';

@Component({
  templateUrl: './technical-inspection.component.html',
  styleUrls: ['./technical-inspection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalInspectionComponent implements OnInit, OnDestroy {
  makeDecision: boolean;
  makeDecision$: Subscription;
  filterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'This Month',
      isCalendar: true,
      onActive: () => { }
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'Total',
      onActive: () => { }
    },
    {
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterTitle: 'Repair',
      onActive: () => { }
    },
    {
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterTitle: '?',
      onActive: () => { }
    },
    {
      filterCount: '09',
      filterTagColor: '#DD5648',
      filterTitle: 'Accident',
      onActive: () => { }
    }
  ];

  setting: TableSetting = {
    columns: [
      { lable: 'Item', field: 'item', renderer: 'vehicleRenderer', width: 150 },
      { lable: 'Status', field: 'status', width: 100 },
      { lable: 'Source', field: 'source', width: 100 },
      { lable: 'Reported by', field: 'reportedby', width: 100 },
      { lable: 'Cost', field: 'cost', width: 100 },
      { lable: 'Insurance Value', field: 'insuranceValue', width: 100 },
      { lable: 'Insurance', field: 'insurance', width: 100 },
      { lable: '', field: '', width: 120, renderer: 'makeDecision' }
    ],
    data: [
      {
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        status: 'Accident',
        source: 'Insurance',
        reportedby: 'Sam Smith',
        cost: '1234567 AED',
        insuranceValue: '1234567 AED',
        insurance: 'Repair',
        action: ''
      },
      {
        statusColor: '#f00',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        status: 'Accident',
        source: 'Insurance',
        reportedby: 'Sam Smith',
        cost: '1234567 AED',
        insuranceValue: '1234567 AED',
        insurance: 'Repair',
        action: ''
      },
      {
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        status: 'Accident',
        source: 'Insurance',
        reportedby: 'Sam Smith',
        cost: '1234567 AED',
        insuranceValue: '1234567 AED',
        insurance: 'Repair',
        action: ''
      },
      {
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        status: 'Accident',
        source: 'Insurance',
        reportedby: 'Sam Smith',
        cost: '1234567 AED',
        insuranceValue: '1234567 AED',
        insurance: 'Repair',
        action: ''
      },
      {
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        status: 'Accident',
        source: 'Insurance',
        reportedby: 'Sam Smith',
        cost: '1234567 AED',
        insuranceValue: '1234567 AED',
        insurance: 'Repair',
        action: ''
      },
      {
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        status: 'Accident',
        source: 'Insurance',
        reportedby: 'Sam Smith',
        cost: '1234567 AED',
        insuranceValue: '1234567 AED',
        insurance: 'Repair',
        action: ''
      },
      {
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        status: 'Accident',
        source: 'Insurance',
        reportedby: 'Sam Smith',
        cost: '1234567 AED',
        insuranceValue: '1234567 AED',
        insurance: 'Repair',
        action: ''
      }
    ]
  };
  constructor(private _makeDecisionService: MakeDecisionService, private _facade: TechnicalInspectionFacade) { }

  ngOnInit(): void {
    this.makeDecision$ = this._makeDecisionService.getMakeDecision().subscribe(
      (open) => {
        this.makeDecision = open;
        console.log(open)
      }
    )
    this._facade.loadAll();
  }

  ngOnDestroy() {
    this.makeDecision$.unsubscribe();
  }
}
