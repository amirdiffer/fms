import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessoryFacade } from '../+state/accessory';
import { AccessoryService } from './accessory.service';

@Component({
  selector: 'anms-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessoryComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  openAdd;
  openAdd$: Subscription;

  //#region Filters
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '',
      filterTagColor: '#CBA786',
      field: 'total',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '',
      filterTagColor: '#07858D',
      field: 'available',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.assigned',
      filterCount: '',
      filterTagColor: '#EF959D',
      field: 'assigned',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.x_accessory',
      filterCount: '',
      filterTagColor: '#DD5648',
      field: 'xAccesssory',
      onActive(index: number) {}
    }
  ];
  //#endregion

  //#region Table
  accessory_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.item', type: 1, field: 'Item' },
      { lable: 'tables.column.type', type: 1, field: 'Type' },
      {
        lable: 'tables.column.asset_sub_asset',
        type: 1,
        field: 'Asset_SubAsset'
      },
      { lable: 'tables.column.assigned_to', type: 1, field: 'Assigned_To' },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'Quantity',
        width: 150,
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          onClick: (col, data) => {
            this._router.navigate(['/fleet/accessory/edit-accessory'], {
              queryParams: { id: data['id'] }
            });
          },
          button: 'edit',
          color: '#3F3F3F'
        }
      ]
    }
  };

  accessory$ = this._accessoryFacade.accessory$.pipe(
    map((x) =>
      x.map((item) => {
        return {
          id: item.id,
          statusColor: '#00AFB9',
          Item: item.itemName,
          Type: item.assignedToType,
          Asset_SubAsset: item.assignedToEntity,
          Assigned_To: item.assignedToEmployeeId,
          Quantity: item.quantity
        };
      })
    )
  );
  //#endregion

  constructor(
    private _accessoryService: AccessoryService,
    private _accessoryFacade: AccessoryFacade,
    private changeDetection: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.openAdd$ = this._accessoryService.getAddForm().subscribe((open) => {
      this.openAdd = open;
    });
    this._accessoryFacade.loadAll();

    this._accessoryFacade.loadStatistics();
    this._accessoryFacade.statistics$.subscribe((data) => {
      if (data) {
        let statistic = data.message;
        this.filterCard.forEach((card, index) => {
          this.filterCard[index].filterCount =
            statistic[this.filterCard[index].field];
        });
        this.changeDetection.detectChanges();
      }
    });
  }

  eventPagination() {
    this._accessoryFacade.loadAll();
  }

  addAccessory() {
    this._accessoryService.loadAddForm(true);
  }

  ngOnDestroy() {
    this.openAdd$.unsubscribe();
  }

  exportTable() {
    this.table.exportTable(this.accessory_Table, 'Accessories');
  }
}
