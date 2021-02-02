import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { TechnicalInspectionFacade } from '@feature/workshop/+state/technical-inspections';

@Component({
  templateUrl: './technical-inspection.component.html',
  styleUrls: ['./technical-inspection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalInspectionComponent implements OnInit {
  filterSetting: FilterCardSetting[] = [
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'Total',
      onActive: () => {}
    },
    {
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterTitle: 'Repair',
      onActive: () => {}
    },
    {
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterTitle: '?',
      onActive: () => {}
    },
    {
      filterCount: '09',
      filterTagColor: '#DD5648',
      filterTitle: 'Accident',
      onActive: () => {}
    }
  ];

  setting: TableSetting = {
    columns: [
      { lable: 'Item', field: 'item', renderer: 'vehicleRenderer' },
      { lable: 'Status', field: 'status', width: 100 },
      { lable: 'Source', field: 'source', width: 100 },
      { lable: 'Reported by', field: 'reportedby' },
      { lable: 'Cost', field: 'cost' },
      { lable: 'Insurance Value', field: 'insuranceValue' },
      { lable: 'Insurance', field: 'insurance', width: 120 },
      { lable: 'Action', field: 'action', width: 100 }
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
  constructor(private _facade: TechnicalInspectionFacade) {}

  ngOnInit(): void {
    this._facade.loadAll();
  }
}
