import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccessoryService } from '../accessory.service';
import { TableSetting } from '@core/table';

@Component({
  selector: 'add-accessory',
  templateUrl: './add-accessory.component.html',
  styleUrls: ['./add-accessory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccessoryComponent implements OnInit {
  public inputForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _accessoryService: AccessoryService
  ) {}

  accessory = [
    { name: 'Accessory Type 1', id: 1 },
    { name: 'Accessory Type 2', id: 2 },
    { name: 'Accessory Type 3', id: 3 },
  ];

  assignedTo = [
    { name: 'assignedTo Type 1', id: 1 },
    { name: 'assignedTo Type 2', id: 2 },
    { name: 'assignedTo Type 3', id: 3 },
  ];

  accessory_Table: TableSetting = {
    columns: [
      { lable: 'Item', type: 1, field: 'Item' },
      { lable: 'Asset/Sub Asset', type: 1, field: 'Asset_SubAsset' },
      { lable: 'Assigned To', type: 1, field: 'Assigned_To' },
      { lable: 'Quantity', type: 1, field: 'Quantity', width: 100 }
    ],
    data: [
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      },
      {
        statusColor: '#00AFB9',
        Item: 'Sticker',
        Asset_SubAsset: 'Item 122334',
        Assigned_To: 'Unassigned',
        Quantity: '2'
      }
    ]
  };

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      itemName: [''],
      assignTo: [''],
      search: [''],
      accessoryType: [''],
      quantity: [''],
      assignedTo: ['']
    });
  }

  cancel() {
    this._accessoryService.loadAddForm(false);
  }
}
