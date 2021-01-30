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
@Component({
  selector: 'anms-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementComponent implements OnInit, AfterViewChecked {
  filterSetting;
  movementOverViewTableSetting;
  requestTableSetting;
  requestFilter: boolean = false;
  requestFilterHide$: Observable<boolean> = of(this.requestFilter);

  @ViewChild('requestTab', { static: true }) requestTab: ElementRef;
  constructor(private _movementService: MovementService) {}

  ngOnInit(): void {
    this.movementOverViewTableSetting = this._movementService.movmentOverViewTableSetting();
    this.requestTableSetting = this._movementService.requestTableSetting();
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
    if (!this.requestTab.nativeElement.classList.contains('hidden-item')) {
      this.requestFilterHide$ = of(false);
    } else {
      this.requestFilterHide$ = of(true);
    }
  }
}
