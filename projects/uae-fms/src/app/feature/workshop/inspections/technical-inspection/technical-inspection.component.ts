import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { MakeDecisionService } from './make-decision/make-decision.service';
import { TechnicalInspectionFacade } from '@feature/workshop/+state/technical-inspections';
import { ButtonType } from '@core/table/table.component';

@Component({
  templateUrl: './technical-inspection.component.html',
  styleUrls: ['./technical-inspection.component.scss']
})
export class TechnicalInspectionComponent implements OnInit, OnDestroy {
  makeDecision: boolean;
  downloadBtn = 'assets/icons/download-solid.svg';
  makeDecision$: Subscription;
  filterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'statistic.this_month',
      isCalendar: true,
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.technical_inspection',
      onActive: () => {}
    },
    {
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterTitle: 'statistic.repair',
      filterSupTitle: 'statistic.insurance_action',
      onActive: () => {}
    },
    {
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterSupTitle: 'statistic.insurance_claim',
      filterTitle: '?',
      onActive: () => {}
    },
    {
      filterCount: '09',
      filterTagColor: '#DD5648',
      filterTitle: 'statistic.accident',
      filterSupTitle: 'statistic.status',
      onActive: () => {}
    }
  ];

  setting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        field: 'item',
        renderer: 'vehicleRenderer',
        width: 150
      },
      { lable: 'tables.column.status', field: 'status', width: 100 },
      { lable: 'tables.column.source', field: 'source', width: 100 },
      { lable: 'tables.column.reported_by', field: 'reportedby', width: 100 },
      {
        lable: 'tables.column.cost',
        field: 'cost',
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.insurance_value',
        field: 'insuranceValue',
        sortable: true,
        width: 100
      },
      {
        lable: 'tables.column.insurance_action',
        field: 'insurance',
        width: 80
      },
      {
        lable: '',
        field: '',
        width: 130,
        renderer: 'button',
        buttonType: ButtonType.makeDecision
      }
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
  constructor(
    private _makeDecisionService: MakeDecisionService,
    private _facade: TechnicalInspectionFacade
  ) {}

  ngOnInit(): void {
    this.makeDecision$ = this._makeDecisionService
      .getMakeDecision()
      .subscribe((open) => {
        this.makeDecision = open;
        // console.log(open);
      });
    this._facade.loadAll();
  }

  ngOnDestroy() {
    this.makeDecision$.unsubscribe();
  }
}
