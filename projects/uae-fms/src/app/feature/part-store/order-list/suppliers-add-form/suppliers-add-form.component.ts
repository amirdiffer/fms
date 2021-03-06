import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableSetting } from '@core/table';

@Component({
  selector: 'suppliers-add-form',
  templateUrl: './suppliers-add-form.component.html',
  styleUrls: ['./suppliers-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuppliersAddFormComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  suppliersTable: TableSetting = {
    columns: [
      { lable: 'tables.column.company', type: 1, field: 'Company' },
      { lable: 'tables.column.name', type: 1, field: 'Name' },
      { lable: 'tables.column.email', type: 1, field: 'Email' },
      { lable: 'tables.column.phone', type: 1, field: 'Phone' },
      { lable: 'tables.column.address', type: 1, field: 'Address' },
      { lable: 'tables.column.quotation', type: 1, field: 'Quotation',sortable: true }
    ],
    data: [
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      }
    ]
  };
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {}
}
