import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterCardSetting } from '@core/filter';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { PartListFacade, PartListService } from '@feature/part-store/+state/part-list';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss']
})
export class PartListComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  partList = true;
  recordId: number;
  selectedTab='assetPartTab';
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#42D0D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '2456',
      filterTagColor: '#20E19D',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.need_to_order',
      filterCount: '2456',
      filterTagColor: '#F2B06E',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '2456',
      filterTagColor: '#AAAAAA',
      onActive(index: number) {}
    }
  ];
  tableAssetPartData$:Observable<any>
  tableSubAssetPartData$:Observable<any>

  tableAssetPart:TableSetting;
  tableSubAssetPart:TableSetting;
  partListDetaisTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        type: 1,
        field: 'thumbText',
        renderer: 'thumbTextRenderer',
        thumbField: 'thumbImage'
      },
      {
        lable: 'tables.column.model',
        type: 2,
        field: 'thumbModeText',
        renderer: '',
        thumbField: 'thumbModeImage'
      },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'quantity',
        sortable: true
      },
      { lable: 'tables.column.description', type: 1, field: 'description' },
      {
        lable: 'tables.column.warranty_expire',
        type: 1,
        field: 'warrantyExpire',
        sortable: true
      },
      { lable: 'tables.column.status', type: 1, field: 'status' },
      {
        lable: 'tables.column.cost',
        type: 1,
        width: 120,
        field: 'cost',
        sortable: true
      },
      {
        lable: 'tables.column.total',
        type: 1,
        width: 120,
        field: 'total',
        sortable: true
      },
      {
        lable: '',
        type: 1,
        field: 'routeLink',
        width: 50,
        renderer: 'routeLinkRenderer'
      }
    ],
    data: [
      // {
      //   id: 1,
      //   thumbImage: 'TILE2._CB1564607297_.png',
      //   thumbText: 'Item No 123456',
      //   thumbModeText: 'BMW',
      //   thumbModeImage: 'bmw.png',
      //   quantity: '1234',
      //   description: 'Description is here',
      //   warrantyExpire: '02/02/2020',
      //   cost: '123 AED',
      //   status: 'Available',
      //   total: '122234 AED',
      //   statusColor: '#20E19D'
      // }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {
        this._router.navigate(['../overview'], {
          relativeTo: this.route,
          queryParams: { id: data.id, categoryId: this.recordId }
        });
      },
      floatButton: [
        {
          button: 'external'
        }
      ]
    }
  };


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private route: ActivatedRoute,
    private _facade: PartListFacade,
    private _service : PartListService
  ) {}

  ngOnInit(): void {
    this.tableAssetPart = this.partListDetaisTable;
    this.tableSubAssetPart = this.partListDetaisTable;
    this._facade.loadAllAssetPartList(2)
    this._facade.assetPartList$.subscribe(x=>{
      console.log(x)
    })
    if (typeof this._activatedRoute.snapshot.params.id != 'undefined') {
      this.partList = false;
      this.filterCard.unshift({
        filterTitle: 'statistic.this_month',
        filterCount: '',
        filterTagColor: '',
        isCalendar: true,
        onActive(index: number) {}
      });
    }
  }

  filterAction(){
    this._service.addSupplier().subscribe(x=>{console.log(x)})
  }

  exportTable() {
    let filter = {
      item: '',
      model: '',
      quantity: '',
      description: '',
      warrantyExpire: '',
      status: '',
      cost: '',
      total: '',
    };
    switch (this.selectedTab) {
      case 'assetPartTab':
        this.table.exportTable(this.tableAssetPart, this.selectedTab, filter);
        break;
      case 'subAssetPartTab':
        this.table.exportTable(this.tableSubAssetPart, this.selectedTab, filter);
        break;
      
    }
  }
}
