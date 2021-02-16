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
@Component({
  selector: 'anms-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementComponent implements OnInit, AfterViewChecked {
  downloadBtn = 'assets/icons/download-solid.svg';
  filterSetting;
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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.movementOverViewTableSetting = this._movementService.movmentOverViewTableSetting();
    this.requestTableSetting = this._movementService.requestTableSetting();
    // Handle confirm button click
    let confirmCol = this.requestTableSetting.columns.find(
      (c) => c.field === 'ButtonConfirm'
    );
    confirmCol.onClick = this.openConfirmModal.bind(this);

    this.filterSetting = [
      {
        filterTitle: 'Total',
        filterCount: '36',
        filterTagColor: '#B892FF'
      },
      {
        filterTitle: 'Waiting For Approval',
        filterCount: '07',
        filterTagColor: '#648DE5'
      },
      {
        filterTitle: 'Approved',
        filterCount: '05',
        filterTagColor: '#709775'
      },
      {
        filterTitle: 'Rejected',
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
}
