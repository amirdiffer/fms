import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alret-dialog/alret-dialog.component';

@Component({
  selector: 'order-form',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFormComponent extends Utility implements OnInit {
  submited = false;

  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add Order',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

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
  constructor(private _fb: FormBuilder, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      createQuotation: ['repeat'],
      assetType: this._fb.group({
        type: ['Type1', [Validators.required]],
        make: ['Type1', [Validators.required]],
        model: ['Type1', [Validators.required]]
      }),
      repeatQuotation: this._fb.group({
        current: ['Type1', [Validators.required]],
        quantity: ['', [Validators.required]],
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
        suppliers: 'BMW',
        description: 'Description is here',
        quantity: '12',
        cost: '1000 AED',
        total: '1000 AED',
        status: 'Recived'
      },
      {
        itemName: 'item Name',
        date: '02/02/2020',
        suppliers: 'BMW',
        description: 'Description is here',
        quantity: '12',
        cost: '1000 AED',
        total: '1000 AED',
        status: 'Recived'
      },
      {
        itemName: 'item Name',
        date: '02/02/2020',
        suppliers: 'BMW',
        description: 'Description is here',
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
          lable: 'tables.column.description',
          field: 'description',
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
          sortable: true,
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

  cancel(): void {
    this.dialogModal = true;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.cancelButton = 'No';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.message = 'Are you sure to cancel adding new order?';
  }

  dialogConfirm(event: any): void {
    this.dialogModal = false;

    if (!this.dialogSetting.hasError && event) {
      this.router.navigate(['/part-store/order-list']).then();
    }
  }

  submit(): void {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }

    this.dialogModal = true;
    this.dialogSetting.message = 'New order added successfully';
    this.dialogSetting.isWarning = false;
    this.dialogSetting.confirmButton = 'OK';
    this.dialogSetting.cancelButton = undefined;
  }
}
