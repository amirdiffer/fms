import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewChecked, Injector, ChangeDetectorRef
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
import { ButtonType } from '@core/table/table.component';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';
@Component({
  selector: 'anms-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementComponent extends Utility implements OnInit, AfterViewChecked {
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
  movementOverViewTableSetting;
  requestTableSetting;
  requestFilter: boolean = false;
  selectedTab;
  requestFilterHide$: Observable<boolean> = of(this.requestFilter);
  showTable = true;
  dialogSuccessSetting: IDialogAlert = {
    header: 'Success',
    hasError: false,
    message: 'Rejected Successfully',
    confirmButton: 'Ok',
  };
  dialogErrorSetting: IDialogAlert = {
    header: 'Error',
    hasError: true,
    message: 'Some Error Occurred',
    confirmButton: 'Ok',
  };
  displaySuccessModal = false;
  displayErrorModal = false;

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

  // movementOverview$ = this._movementOverviewFacade.MovementOverview$.pipe(
  //   map(x => {
  //     return x.map(y => {
  //       return {...y, }
  //     });
  // }));

  movementRequest$ = this._movementRequestsFacade.MovementRequests$.pipe(
    map(x => {
      return x.map(y => {
        return {...y, }
      });
  }));

  ngOnInit(): void {
    this._movementOverviewFacade.loadAll();
    this._movementRequestsFacade.loadAll();
    this._movementRequestsFacade.MovementRequests$.subscribe((data) => {
      console.log(data);
    });
    this._movementRequestsFacade.loadRequestStatistic();
    this._movementRequestsFacade.MovementRequestStatistic.subscribe((x) => {
      console.log(x);
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

    this.movementOverViewTableSetting = this._movementService.movmentOverViewTableSetting();
    this.requestTableSetting = {
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
            console.log('ddd')
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
      data: this._movementService.requestData(),
      rowSettings: {
        onClick: (data, button?, col?) => {
          if (button == 'reject')
            this._movementRequestsFacade.rejecting(data.id);
        },
      }
    };
    // Handle confirm button click
    let confirmCol = this.requestTableSetting.columns.find(
      (c) => c.field === 'ButtonConfirm'
    );
    let rejectCol = this.requestTableSetting.columns.find(
      (c) => c.field === 'ButtonReject'
    );
    confirmCol.onClick = this.openConfirmModal.bind(this);
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

    this._movementRequestsFacade.rejected$.subscribe(x => {
      if (x) {
        this.displaySuccessModal = true;
        this.dialogErrorSetting.hasError=false;
        this.changeDetector.detectChanges();
      }
    });
    this._movementRequestsFacade.error$.subscribe(x => {
      console.log(x)
      if (x?.error) {
        this.displayErrorModal = true;
        this.dialogErrorSetting.hasError=true;
        this.changeDetector.detectChanges();
      } else {
        this.displayErrorModal = false;
      }
    })

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
      data: 1,
    });
  }
  rejectRow() {
    console.log('reject');
  }
}
