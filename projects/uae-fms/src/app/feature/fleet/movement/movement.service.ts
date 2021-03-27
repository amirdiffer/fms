import { Injectable } from '@angular/core';
import { ButtonType } from '@core/table/table.component';
import { IMovementOverView, IRequests } from './movement.model';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private movmentOverViewData = (): IMovementOverView[] => {
    const data = [];
    for (let index = 0; index < 9; index++) {
      const el = {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        duration: '2 Days',
        startDate: 'Saturday 02/02 12:30',
        endDate: 'Saturday 02/02 12:30',
        department: 'Department Name',
        operator: {
          name: 'Sam Smith',
          subName: '123456'
        },
        fine: 3,
        reason: 'Reason is here'
      };
      data.push(el);
    }
    return data;
  };

  public movmentOverViewTableSetting = () => {
    return {
      columns: [
        {
          lable: 'tables.column.asset',
          field: 'asset',
          width: 140,
          type: 1,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'tables.column.duration',
          field: 'duration',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.start_date',
          field: 'startDate',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.department',
          field: 'department',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.operator',
          field: 'operator',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: 'subtextRenderer'
        },
        {
          lable: 'tables.column.fine',
          field: 'fine',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.reason',
          field: 'reason',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: []
    };
  };

  private requestData = (): IRequests[] => {
    const data = [];
    for (let index = 0; index < 9; index++) {
      const el = {
        user: {
          img: 'user-image.png',
          userName: 'Sam Smith',
          subName: '123456789'
        },
        movementType: 'Temporary',
        requestType: 'Replacement',
        assetType: 'Car',
        reason: 'Reason is Here',
        date: 'Saturday 02/02 12:30',
        requestStatus: 'Waiting For Approval',
        operation: {
          accept: 'Confirm',
          cancel: 'Reject'
        }
      };
      data.push(el);
    }
    return data;
  };

  public requestTableSetting = () => {
    return {
      columns: [
        {
          lable: 'tables.column.user',
          field: 'user',
          width: 140,
          type: 1,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'tables.column.movement_type',
          field: 'movementType',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.request_type',
          field: 'requestType',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.asset_type',
          field: 'assetType',
          width: 70,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.reason',
          field: 'reason',
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
          lable: 'tables.column.request_status',
          field: 'requestStatus',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: '',
          field: 'ButtonReject',
          width: 80,
          type: 1,
          thumbField: '',
          renderer: 'button',
          buttonType: ButtonType.reject,
          showOnHover: true
        },
        {
          lable: '',
          width: 100,
          type: 1,
          field: 'ButtonConfirm',
          renderer: 'button',
          buttonType: ButtonType.confirm,
          showOnHover: true
        }
      ],
      data: this.requestData()
    };
  };
  constructor() {}

  openConfirmModal() {}
}
