import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import { MovementService } from './movement.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MovementConfirmComponent } from './movement-confirm/movement-confirm.component';
import {
  MovementOverviewFacade,
  MovementRequestsFacade
} from '../+state/movement';
import { map } from 'rxjs/operators';
import { ButtonType, TableComponent } from '@core/table/table.component';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementComponent
  extends Utility
  implements OnInit, AfterViewChecked {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  filterSetting = [
    {
      filterTitle: 'statistic.total',
      filterCount: '36',
      filterTagColor: '#B892FF'
    },
    {
      filterTitle: 'statistic.waiting_for_approval',
      filterCount: '07',
      filterTagColor: '#648DE5'
    },
    {
      filterTitle: 'statistic.approved',
      filterCount: '05',
      filterTagColor: '#709775'
    },
    {
      filterTitle: 'statistic.rejected',
      filterCount: '12',
      filterTagColor: '#EF7A85'
    }
  ];

  requestFilter: boolean = false;
  selectedTab;
  requestFilterHide$: Observable<boolean> = of(this.requestFilter);
  showTable = true;
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
  displaySuccessModal = false;
  displayErrorModal = false;
  assignID: number;

  @ViewChild('requestTab', { static: true }) requestTab: ElementRef;

  constructor(
    private _movementService: MovementService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private _movementOverviewFacade: MovementOverviewFacade,
    private _movementRequestsFacade: MovementRequestsFacade,
    private changeDetector: ChangeDetectorRef,
    injector: Injector
  ) {
    super(injector);
  }

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
            assetType: y['assetTypeName'],
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
        onClick: (data) => {
          // this._movementRequestsFacade.rejecting(data);
        },
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
    data: [],
    rowSettings: {
      onClick: (data, button?, col?) => {
        if (button == 'reject') this._movementRequestsFacade.rejecting(data.id);
        else if (button == 'confirm') {
          this.assignID = data.id;
          this.openConfirmModal();
        }
      }
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

  ngOnInit(): void {
    this._movementOverviewFacade.loadAll();
    this._movementRequestsFacade.loadAll();
    this._movementRequestsFacade.loadRequestStatistic();
    this._movementRequestsFacade.MovementRequestStatistic.subscribe((x) => {
      if (x) {
        const response = x.message;
        this.filterSetting.map((filter) => {
          switch (filter.filterTitle) {
            case 'statistic.total':
              filter.filterCount = response.total;
              break;
            case 'statistic.waiting_for_approval':
              filter.filterCount = response.waitingForApproval;
              break;
            case 'statistic.approved':
              filter.filterCount = response.approved;
              break;
            case 'statistic.rejected':
              filter.filterCount = response.rejected;
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
        filterCount: '36',
        filterTagColor: '#B892FF'
      },
      {
        filterTitle: 'statistic.waiting_for_approval',
        filterCount: '07',
        filterTagColor: '#648DE5'
      },
      {
        filterTitle: 'statistic.approved',
        filterCount: '05',
        filterTagColor: '#709775'
      },
      {
        filterTitle: 'statistic.rejected',
        filterCount: '12',
        filterTagColor: '#EF7A85'
      }
    ];

    this._movementRequestsFacade.rejected$.subscribe((x) => {
      if (x) {
        this.displaySuccessModal = true;
        this.dialogErrorSetting.hasError = false;
        this.changeDetector.detectChanges();
      }
    });
    this._movementRequestsFacade.error$.subscribe((x) => {
      if (x?.error) {
        this.displayErrorModal = true;
        this.dialogErrorSetting.hasError = true;
        this.changeDetector.detectChanges();
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
    this.dialog.open(MovementConfirmComponent, {
      height: '600px',
      width: '800px',
      data: this.assignID
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
    switch (this.selectedTab) {
      case 'MovementOverViewTab':
        this.table.exportTable(this.movementOverViewTableSetting, 'Overview');
        break;
      case 'requestTab':
        this.table.exportTable(this.requestTableSetting, 'Request');
        break;
    }
  }
}
