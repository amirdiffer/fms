import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  Injector
} from '@angular/core';
import { MovementService } from './movement.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MovementConfirmComponent } from './movement-confirm/movement-confirm.component';
import { MovementOverviewFacade } from '../+state/movement/permanent/overview';
import { MovementRequestsFacade } from '../+state/movement/permanent/requests';
import { map } from 'rxjs/operators';
import { ButtonType, TableComponent } from '@core/table/table.component';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';
import { FilterCardSetting } from '@core/filter';

@Component({
  selector: 'anms-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent
  extends Utility
  implements OnInit, AfterViewChecked {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  @ViewChild('requestTab', { static: true }) requestTab: ElementRef;

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  filterSetting = [
    {
      filterTitle: 'statistic.total',
      filterCount: 0,
      filterTagColor: '#B892FF'
    },
    {
      filterTitle: 'statistic.waiting_for_approval',
      filterCount: 0,
      filterTagColor: '#648DE5'
    },
    {
      filterTitle: 'statistic.approved',
      filterCount: 0,
      filterTagColor: '#709775'
    },
    {
      filterTitle: 'statistic.rejected',
      filterCount: 0,
      filterTagColor: '#EF7A85'
    }
  ];

  //#region Dialogs
  displaySuccessModal = false;
  displayErrorModal = false;
  dialogType: string;
  dialogSuccessSetting: IDialogAlert = {
    header: 'Success',
    hasError: false,
    message: 'Rejected Successfully',
    confirmButton: 'Ok'
  };
  dialogErrorSetting: IDialogAlert = {
    header: 'Error',
    hasError: true,
    message: 'Some Error Occurred',
    confirmButton: 'Ok'
  };
  //#endregion

  requestFilter: boolean = false;
  selectedTab;
  requestFilterHide$: Observable<boolean> = of(this.requestFilter);
  showTable = true;
  assignID: number;
  rejectId: number;

  //#region Table
  movementOverviewCount$ = this._movementOverviewFacade.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  movementRequestCount$ = this._movementRequestsFacade.conut$.pipe(
    map((x) => {
      return x;
    })
  );

  movementRequest$ = this._movementRequestsFacade.MovementRequests$.pipe(
    map((x) => {
      return x.map((y) => {
        if (y)
          return {
            ...y,
            id: y['id'],
            user: {
              img: 'user-image.png',
              userName:
                y['requester'] && y['requester']['firstName']
                  ? y['requester']['firstName']
                  : '',
              subName:
                y['requester'] && y['requester']['lastName']
                  ? y['requester']['lastName']
                  : ''
            },
            movementType: y['movementType'],
            requestType: y['requestType'],
            assetType: y['assetConfigurationName'],
            reason: y['reason'],
            date: 'Saturday 02/02 12:30',
            requestStatus: y['status'],
            operation: {
              accept: 'Confirm',
              cancel: 'Reject'
            }
          };
      });
    })
  );

  movementOverview$ = this._movementOverviewFacade.MovementOverview$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          id: y.id,
          asset: {
            img: 'thumb1.png',
            assetName: y.asset.dpd,
            assetSubName: 'DPD 0000001',
            ownership: 'Owned'
          },
          duration: '2 Days',
          startDate: y.request.startDate,
          endDate: y.request.endDate,
          department: y.department.name,
          operator: {
            name: y.operator.firstName + ' ' + y.operator.lastName,
            subName: y.operator.id
          },
          fine: 3,
          reason: y.request.reason
        };
      });
    })
  );

  requestTableSetting = {
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
        onClick: null,
        click: (data, col) => {
          this.reject(data);
          return null;
        },
        showOnHover: true,
        condition: (data) => {
          return data.requestStatus == 'REQUESTED';
        }
      },
      {
        lable: '',
        width: 100,
        type: 1,
        field: 'ButtonConfirm',
        renderer: 'button',
        buttonType: ButtonType.confirm,
        showOnHover: true,
        condition: (data) => {
          return data.requestStatus == 'REQUESTED';
        }
      }
    ],
    data: [],
    rowSettings: {
      onClick: (data, button?, col?) => {
        // TODO : handle confirm message

        if (button == 'confirm') {
          this.assignID = data.id;
          this.openConfirmModal();
        }
      },
      permission: ['MOVEMENT_REQUEST_ASSIGN_OPERATOR_OR_REJECT']
    }
  };

  movementOverViewTableSetting = {
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
  //#endregion

  constructor(
    private _movementService: MovementService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private _movementOverviewFacade: MovementOverviewFacade,
    private _movementRequestsFacade: MovementRequestsFacade,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._movementRequestsFacade.loadRequestStatistic();
    this._movementRequestsFacade.MovementRequestStatistic.subscribe((x) => {
      if (x) {
        this.filterSetting.map((filter) => {
          switch (filter.filterTitle) {
            case 'statistic.total':
              filter.filterCount = x.total;
              break;
            case 'statistic.waiting_for_approval':
              filter.filterCount = x.waitingForApproval;
              break;
            case 'statistic.approved':
              filter.filterCount = x.approved;
              break;
            case 'statistic.rejected':
              filter.filterCount = x.rejected;
              break;
            default:
              break;
          }
        });
      }
    });

    // Handle confirm button click
    let confirmCol = this.requestTableSetting.columns.find(
      (c) => c.field === 'ButtonConfirm'
    );
    let rejectCol = this.requestTableSetting.columns.find(
      (c) => c.field === 'ButtonReject'
    );
    confirmCol.onClick = this.openConfirmModal.bind(this);
    // @ts-ignore
    rejectCol.onClick = this.rejectRow();
    this.filterSetting = [
      {
        filterTitle: 'statistic.total',
        filterCount: 10,
        filterTagColor: '#B892FF'
      },
      {
        filterTitle: 'statistic.waiting_for_approval',
        filterCount: 0,
        filterTagColor: '#648DE5'
      },
      {
        filterTitle: 'statistic.approved',
        filterCount: 0,
        filterTagColor: '#709775'
      },
      {
        filterTitle: 'statistic.rejected',
        filterCount: 0,
        filterTagColor: '#EF7A85'
      }
    ];

    this._movementRequestsFacade.rejected$.subscribe((x) => {
      if (x) {
        this.dialogSuccessSetting.isWarning = false;
        this.dialogSuccessSetting.hasError = false;
        this.dialogSuccessSetting.message = 'The Request Rejected Successfully';
        this.dialogSuccessSetting.confirmButton = 'Ok';
        this.dialogSuccessSetting.cancelButton = undefined;
        this.dialogType = 'confirm';
        this.displaySuccessModal = true;
        this._movementRequestsFacade.loadAll();
      }
    });
    this._movementRequestsFacade.error$.subscribe((x) => {
      if (x?.error) {
        this.displayErrorModal = true;
        this.dialogErrorSetting.hasError = true;
      } else {
        this.displayErrorModal = false;
      }
    });
  }

  ngAfterViewChecked() {
    if (
      this.requestTab &&
      !this.requestTab.nativeElement.classList.contains('hidden-item')
    ) {
      this.requestFilterHide$ = of(false);
    } else {
      this.requestFilterHide$ = of(true);
    }
  }

  openConfirmModal() {
    let dialog = this.dialog.open(MovementConfirmComponent, {
      height: '600px',
      width: '800px',
      data: this.assignID
    });

    dialog.afterClosed().subscribe((x) => {
      this._movementOverviewFacade.loadAll();
      this._movementRequestsFacade.loadAll();
    });
  }
  rejectRow() {
    // console.log('reject');
  }

  successConfirm(confirmed) {
    if (confirmed) {
      this.displaySuccessModal = false;
      this.displayErrorModal = false;
      this._movementRequestsFacade.reset();

      if (this.dialogType == 'rejection') {
        this._movementRequestsFacade.rejecting(this.rejectId);
      }
    } else this.displaySuccessModal = false;
  }

  dialogConfirm($event) {
    this.displayErrorModal = false;
    this.displaySuccessModal = false;
    this._movementRequestsFacade.reset();
  }

  eventPagination_overview() {
    this._movementOverviewFacade.loadAll();
  }

  eventPagination_request() {
    this._movementRequestsFacade.loadAll();
  }

  exportTable() {
    let filter;
    switch (this.selectedTab) {
      case 'MovementOverViewTab':
        filter = {
          asset: 'asset.assetName|asset.assetSubName|asset.ownership',
          duration: 'duration',
          startDate: 'startDate',
          department: 'department',
          operator: 'operator',
          fine: 'fine',
          reason: 'reason'
        };
        this.table.exportTable(
          this.movementOverViewTableSetting,
          'Overview',
          filter
        );
        break;
      case 'requestTab':
        filter = {
          user: 'user.userName|user.subName',
          movementType: 'movementType',
          requestType: 'requestType',
          assetType: 'assetType',
          reason: 'reason',
          date: 'date',
          requestStatus: 'requestStatus'
        };
        this.table.exportTable(this.requestTableSetting, 'Request', filter);
        break;
    }
  }

  reject(data) {
    if (data?.id) {
      this.rejectId = data.id;
      this.dialogType = 'rejection';
      this.dialogSuccessSetting.isWarning = true;
      this.dialogSuccessSetting.message =
        'Are you sure you want to reject this request?';
      this.dialogSuccessSetting.confirmButton = 'Yes';
      this.dialogSuccessSetting.cancelButton = 'Cancel';
      this.displaySuccessModal = true;
    }
  }
}
