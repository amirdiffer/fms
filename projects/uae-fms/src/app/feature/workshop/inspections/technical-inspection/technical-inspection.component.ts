import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { TechnicalInspectionFacade } from '@feature/workshop/+state/technical-inspections';
import { Router } from '@angular/router';

@Component({
  templateUrl: './technical-inspection.component.html',
  styleUrls: ['./technical-inspection.component.scss']
})
export class TechnicalInspectionComponent implements OnInit, OnDestroy {
  downloadBtn = 'assets/icons/download-solid.svg';
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
        lable: 'tables.column.asset',
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
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
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
    ],
    rowSettings: {
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
          }
        },
        {
          button: 'external',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            // todo check condition data.id
            if (true) {
              this._router.navigate(['/workshop/inspections/technical-inspection-report/', 1])
            }
          }
        },
        {
          button: 'cancel',
          color: '#F75A4A',
          onClick: (col, data, button?) => {
          }
        }
      ]
    }
  };
  constructor(
    private _facade: TechnicalInspectionFacade,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
  }
}
