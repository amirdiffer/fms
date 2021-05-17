import { Component, OnInit } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { TableSetting } from '@core/table';
import { ButtonType, ColumnType } from '@core/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestListFacade } from '@feature/part-store/+state/order-list/request/index';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';

  activeTab = 'request_list';
  orderListType='asset';

  requestStatisticsSubscription:Subscription;
  orderStatisticsSubscription:Subscription;

  requestTableData$:Observable<any>;
  orderTableData$:Observable<any>;
  supplierTableData$:Observable<any>;


  requestStatistics: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.requests',
      filterCount: '0',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.requested',
      filterSupTitle: 'statistic.requests',
      filterCount: '0',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.approved',
      filterSupTitle: 'statistic.requests',
      filterCount: '0',
      filterTagColor: '#009EFF',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.rejected',
      filterSupTitle: 'statistic.requests',
      filterCount: '0',
      filterTagColor: '#F75A4A',
      onActive(index: number) {}
    }
  ];

  filterCard2: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.this_month',
      filterCount: '',
      filterTagColor: '',
      isCalendar: true,
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.order',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.approved',
      filterSupTitle: 'statistic.order',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.waiting',
      filterSupTitle: 'statistic.order',
      filterCount: '02',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.rejected',
      filterSupTitle: 'statistic.order',
      filterCount: '09',
      filterTagColor: '#DD5648',
      onActive(index: number) {}
    }
  ];

  requestList_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.item', 
        type: ColumnType.lable, 
        field: 'Item', 
        width: 150 
      },
      { lable: 'tables.column.part_id', 
        type: 1, 
        field: 'Part_ID', 
        width: 150 
      },
      {
        lable: 'tables.column.status',
        type: ColumnType.lable,
        field: 'Status',
        width: 100,
        renderer: ''
      },
      {
        lable: 'tables.column.quantity',
        type: ColumnType.lable,
        field: 'Quantity',
        width: 150,
        sortable: true
      },
      {
        lable: 'tables.column.department',
        type: ColumnType.lable,
        field: 'Department',
        width: 180
      },
      {
        lable: 'tables.column.description',
        type: ColumnType.lable,
        field: 'Description',
        width: 180
      },
      {
        lable: 'tables.column.date',
        type: ColumnType.lable,
        field: 'Date',
        sortable: true,
        width: 160
      },
      {
        lable: '',
        field: 'floatButton',
        width: 50,
        type: ColumnType.lable,
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'reject',
          color:"#F74F5A",
          onClick: (col, data, button?) => {
            switch (this.orderListType) {
              case 'asset':
                this._requestListFacade.rejectSpecificRequestPartofAsset(data.id)
                break;
              case 'sub-asset':
                this._requestListFacade.rejectSpecificRequestPartofSubAsset(data.id)
                break;
            };
          }
        },
        {
          button: 'approve',
          onClick: (col, data, button?) => {
            switch (this.orderListType) {
              case 'asset':
                this._requestListFacade.approveSpecificRequestPartofAsset(data.id)
                break;
              case 'sub-asset':
                this._requestListFacade.approveSpecificRequestPartofSubAsset(data.id)
                break;
            };
            
          },
        }
      ]
    }
  };
  myOrder_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.request_id', type: 1, field: 'Item', width: 150 },
      { lable: 'tables.column.part_id', type: 1, field: 'Part_ID', width: 120 },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'Quantity',
        width: 150,
        hasPadding5: true,
        sortable: true
      },
      { lable: 'tables.column.date', type: 1, field: 'Date' },
      {
        lable: 'tables.column.description',
        type: 1,
        field: 'Description',
        width: 200
      },
      {
        lable: 'tables.column.expected_receive_date',
        type: 1,
        width: 230,
        hasPadding3: true,
        field: 'Expected_Receive_date'
      },
      {
        lable: 'tables.column.cost',
        type: 1,
        field: 'Cost',
        sortable: true,
        width: 120,
        hasPadding3: true
      },
      {
        lable: 'tables.column.total',
        type: 1,
        field: 'Total',
        sortable: true,
        width: 120,
        hasPadding3: true
      },
      {
        lable: '',
        type: 1,
        width: 150,
        field: 'ButtonRecived',
        renderer: 'button',
        buttonType: ButtonType.receiveAndEdit,
        showOnHover: true
      }
    ],
    data: [
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Quantity: '2',
        Date: '02/02/2020',
        Description: 'Description is here',
        Expected_Receive_date: '02/02/2020',
        Cost: '100 AED',
        Total: '1000 AED',
        Status: 'Approved',
        ButtonRecived: 'Recived'
      }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {
        if (data === 'edit') {
          if (col.id) {
            this._router.navigate(['/part-store/order-list/edit-order-list/' + col.id], { queryParams: { type: 'asset' } }).then();
          }
        } else {
          this._router.navigate(['/part-store/order-list/receive-order/' + col.id],
            { queryParams: { fleetType: 'asset' } }).then();
        }
      }
    }
  };

  suppliers_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.company', type: 1, field: 'Company' },
      { lable: 'tables.column.name', type: 1, field: 'Name' },
      { lable: 'tables.column.email', type: 1, field: 'Email' },
      { lable: 'tables.column.phone', type: 1, field: 'Phone' },
      { lable: 'tables.column.address', type: 1, field: 'Address' },
      {
        lable: 'tables.column.quotation',
        width: 180,
        type: 1,
        field: 'Quotation',
        sortable: true
      }
    ],
    data: []
  };

  constructor(private _requestListFacade: RequestListFacade, 
              private _router: Router,
              private _activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    let activateRoute = this._activatedRoute.snapshot.url;
    this.orderListType = activateRoute[activateRoute.length -1].path;
    switch (this.orderListType) {
      case 'asset':
        this._requestListFacade.loadStatisticsOfRequestPartforAsset();
        this._requestListFacade.loadRequestPartforAsset();
        break;
      case 'sub-asset':
        this._requestListFacade.loadStatisticsOfRequestPartforSubAsset();
        this._requestListFacade.loadRequestPartforSubAsset();
        break;
    };
    this._requestListFacade.requestList$.subscribe(x=>{console.log(x)})
    /* Load Request List */
    this.requestTableData$ = this._requestListFacade.requestList$.pipe(
      map(x => {
        return x.map(request => {
          return {
            ...request,
            Item: request.itemName,
            Part_ID: request.partId,
            Status: request.status.toLowerCase(),
            Quantity: request.quantity,
            Department: request.organizationName,
            Description: request.description,
            Date: new Date (request.createdAt).toLocaleString().split(',')[0],
            statusColor: '#838BCE',
          }
        })
      }
      )
    )
    this.requestStatisticsSubscription = this._requestListFacade.statistics$.subscribe(
      x=>{
        console.log(x)
        if(x){
          this.requestStatistics.map(y=>{
            switch (y.filterTitle) {
              case 'statistic.total':
                  y.filterCount = x.total
                break;
              case 'statistic.requested':
                y.filterCount = x.requested
                break;
              case 'statistic.approved':
                y.filterCount = x.approved
                break;
              case 'statistic.rejected':
                y.filterCount = x.rejected
                break;
            }
          })
        }
      }
    );
    this._requestListFacade.requestList$.subscribe(x => { console.log(x)})
    // this.requestTableData$ = 


  }

  eventPagination_requestList(){
    switch (this.orderListType) {
      case 'asset':
        this._requestListFacade.loadRequestPartforAsset()
        break;
      case 'sub-asset':
        this._requestListFacade.loadRequestPartforSubAsset()
        break;
    }
  }
}
