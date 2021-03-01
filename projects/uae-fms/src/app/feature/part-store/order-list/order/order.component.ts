import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'order-form',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFormComponent implements OnInit {
  checked = false;
  assetTypeOptions = [
    { name: 'Type 1', value: 'Type1' },
    { name: 'Type 2', value: 'Type2' },
    { name: 'Type 3', value: 'Type3' },
    { name: 'Type 4', value: 'Type4' },
    { name: 'Type 5', value: 'Type5' }
  ];
  selectedOption: '';
  tableSetting;
  tableData;
  public inputForm: FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      createQuotation: ['repeat'],
      assetType: this._fb.group({
        type: ['Type1'],
        make: ['Type1'],
        model: ['Type1']
      }),
      repeatQuotation: this._fb.group({
        current: ['Type1'],
        quantity: [''],
        description: ['']
      }),
      newOrder: this._fb.group({
        categoryItem: [''],
        item: [''],
        quantity: [''],
        supplier: [''],
        warranty: [false],
        description: ['']
      }),
      setReminder: [false]
    });

    this.tableData = [
      {
        itemName: 'item Name',
        date: '02/02/2020',
        suppliers: 'Description is here',
        quantity: '12',
        cost: '1000 AED',
        total: '1000 AED',
        status: 'Recived'
      },
      {
        itemName: 'item Name',
        date: '02/02/2020',
        suppliers: 'Description is here',
        quantity: '12',
        cost: '1000 AED',
        total: '1000 AED',
        status: 'Recived'
      },
      {
        itemName: 'item Name',
        date: '02/02/2020',
        suppliers: 'Description is here',
        quantity: '12',
        cost: '1000 AED',
        total: '1000 AED',
        status: 'Recived'
      }
    ];
    this.tableSetting = {
      columns: [
        {
          lable: 'tables.column.item',
          field: 'itemName',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.date',
          field: 'date',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.suppliers',
          field: 'suppliers',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.quantity',
          field: 'quantity',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.cost',
          field: 'cost',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.total',
          field: 'total',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.status',
          field: 'status',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: this.tableData
    };
  }
}
