import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewChecked
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
@Component({
  selector: 'anms-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementComponent implements OnInit, AfterViewChecked {
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

  @ViewChild('requestTab', { static: true }) requestTab: ElementRef;

  constructor(
    private _movementService: MovementService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private _movementOverviewFacade: MovementOverviewFacade,
    private _movementRequestsFacade: MovementRequestsFacade
  ) {}

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
    this.requestTableSetting = this._movementService.requestTableSetting();
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
      width: '800px'
    });
  }
  rejectRow() {
    console.log('reject');
  }
}
