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
  filterSetting;
  movementOverViewTableSetting;
  requestTableSetting;
  requestFilter: boolean = false;
  requestFilterHide$: Observable<boolean> = of(this.requestFilter);
  showTable = true;
  requestForm: FormGroup;

  @ViewChild('requestTab', { static: true }) requestTab: ElementRef;
  assetTypes = [
    { name: 'Asset type 1', id: 1 },
    { name: 'Asset type 2', id: 2 },
    { name: 'Asset type 3', id: 3 },
    { name: 'Asset type 4', id: 4 },
    { name: 'Asset type 5', id: 5 },
    { name: 'Asset type 6', id: 6 }
  ];
  oldAssetSuggests = [
    { name: 'Old asset type 1', id: 1 },
    { name: 'Old asset type 2', id: 2 },
    { name: 'Old asset type 3', id: 3 },
    { name: 'Old asset type 4', id: 4 },
    { name: 'Old asset type 5', id: 5 },
    { name: 'Old asset type 6', id: 6 }
  ];

  constructor(
    private _movementService: MovementService,
    private _fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.requestForm = this._fb.group({
      requestType: ['new'],
      assetType: [''],
      resone: [''],
      quality: [''],
      oldAssetType: ['']
    });
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

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.oldAssetSuggests = [
      { name: 'Old asset type 1', id: 1 },
      { name: 'Old asset type 2', id: 2 },
      { name: 'Old asset type 3', id: 3 },
      { name: 'Old asset type 4', id: 4 },
      { name: 'Old asset type 5', id: 5 },
      { name: 'Old asset type 6', id: 6 }
    ];
  }

  openConfirmModal() {
    this.dialog.open(MovementConfirmComponent, {
      height: '600px',
      width: '800px'
    });
  }
}
