import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { TableSetting } from '@core/table';
import { ButtonType, ColumnType } from '@core/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestListFacade } from '@feature/part-store/+state/order-list/request/index';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuppliersFacade } from '../+state/order-list/suppliers';
import { OrderListFacade } from '../+state/order-list/order';

@Component({
  selector: 'anms-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit , OnDestroy {
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

  orderStatistics: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.order',
      filterCount: '0',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.received',
      filterSupTitle: 'statistic.order',
      filterCount: '0',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.registered',
      filterSupTitle: 'statistic.order',
      filterCount: '0',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.archived',
      filterSupTitle: 'statistic.order',
      filterCount: '0',
      filterTagColor: '#DD5648',
      onActive(index: number) {}
    }
  ];

  requestList_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.item', 
        type: ColumnType.lable, 
        field: 'Item', 
      },
      { lable: 'tables.column.part_id', 
        type: 1, 
        field: 'Part_ID', 
      },
      {
        lable: 'tables.column.status',
        type: ColumnType.lable,
        field: 'Status',
        renderer: ''
      },
      {
        lable: 'tables.column.quantity',
        type: ColumnType.lable,
        field: 'Quantity',
        sortable: true
      },
      {
        lable: 'tables.column.department',
        type: ColumnType.lable,
        field: 'Department',
      },
      {
        lable: 'tables.column.description',
        type: ColumnType.lable,
        field: 'Description',
      },
      {
        lable: 'tables.column.date',
        type: ColumnType.lable,
        field: 'Date',
        sortable: true,
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
          button: 'edit',
          onClick: (col, data, button?) => {
            switch (this.orderListType) {
              case 'asset':
                this._router.navigate(['part-store/order-list/asset/edit-request/'+data.id])
                break;
              case 'sub-asset':
                this._router.navigate(['part-store/order-list/sub-asset/edit-request/'+data.id])
                break;
            };
          },
        },
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
          }
        }
        
      ]
    }
  };
  myOrder_Table: TableSetting = {
    columns: [
      { 
        lable: 'tables.column.item', 
        type: ColumnType.lable, 
        field: 'Item', 
      },
      { 
        lable: 'tables.column.part_id', 
        type: ColumnType.lable, 
        field: 'Part_ID', 
      },
      { 
        lable: 'tables.column.status', 
        type: ColumnType.lable, 
        field: 'Status', 
      },
      {
        lable: 'tables.column.quantity',
        type: ColumnType.lable,
        field: 'Quantity',
        sortable: true
      },
      { 
        lable: 'tables.column.date', 
        type: ColumnType.lable, 
        field: 'Date' 
      },
      {
        lable: 'tables.column.description',
        type: ColumnType.lable,
        field: 'Description',
      },
      {
        lable: 'tables.column.cost',
        type: ColumnType.lable,
        field: 'Cost',
        sortable: true,
      },
      {
        lable: '',
        field: 'floatButton',
        width: 50,
        type: ColumnType.lable,
        renderer: 'floatButton'
      }
    ],
    data:[],
    rowSettings: {
      floatButton: [
        {
          button: 'edit',
          onClick: (col, data, button?) => {
            switch (this.orderListType) {
              case 'asset':
                this._router.navigate(['part-store/order-list/asset/edit-order/'+data.id])
                break;
              case 'sub-asset':
                this._router.navigate(['part-store/order-list/sub-asset/edit-order/'+data.id])
                break;
            };
          },
        },
        {
          button: 'receive',
          onClick: (col, data, button?) => {
            this._router.navigate(['part-store/order-list/receive-order/'+data.id])
          },
        },
      ]
    }
  };

  suppliers_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.company', type: ColumnType.lable , field: 'company' },
      { lable: 'tables.column.name', type: ColumnType.lable , field: 'name' },
      { lable: 'tables.column.email', type: ColumnType.lable , field: 'email' },
      { lable: 'tables.column.phone', type: ColumnType.lable , field: 'phone' },
      { lable: 'tables.column.address', type: ColumnType.lable , field: 'address' },
      {lable: '',field: 'floatButton',width: 0,type: ColumnType.lable ,renderer: 'floatButton'}
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'edit',
          onClick: (col, data, button?) => {
            this._router.navigate(['part-store/order-list/edit-supplier/'+data.id])
          },
        },    
      ]
    }
  };

  constructor(private _requestListFacade: RequestListFacade,
              private _supplierListFacade : SuppliersFacade, 
              private _facadeOrderList : OrderListFacade,
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
        this._facadeOrderList.loadOrderPartforAsset();
        this._facadeOrderList.loadStatisticsOfOrderPartforAsset();
        break;
      case 'sub-asset':
        this._requestListFacade.loadStatisticsOfRequestPartforSubAsset();
        this._requestListFacade.loadRequestPartforSubAsset();
        this._facadeOrderList.loadOrderPartforSubAsset();
        this._facadeOrderList.loadStatisticsOfOrderPartforSubAsset();
        break;
    };

    this._supplierListFacade.loadAll();


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
      })
    );
    this.requestStatisticsSubscription = this._requestListFacade.statistics$.subscribe(
      x=>{
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


    /* Load Order Table Data */
    this.orderTableData$ = this._facadeOrderList.orderList$.pipe(
      map(x =>{
        if(x){
          return x.map( order => {
            return {
              ...order,
              statusColor: '#838BCE',
              Item:order.itemName,
              Part_ID: order.itemId,
              Quantity:order.quantity,
              Date:new Date (order.createdAt).toLocaleString().split(',')[0],
              Description:order.description,
              Cost:order.price,
              Status:order.status
            }
          })
        }
      })
    );

    this.orderStatisticsSubscription = this._facadeOrderList.statistics$.subscribe(
      x=>{
        if(x){
          this.orderStatistics.map(y=>{
            switch (y.filterTitle) {
              case 'statistic.total':
                  y.filterCount = x.total
                break;
              case 'statistic.received':
                y.filterCount = x.received
                break;
              case 'statistic.registered':
                y.filterCount = x.justRequest
                break;
              case 'statistic.archived':
                y.filterCount = x.archived
                break;
            }
          })
        }
      }
    );
    

    /* Load Supplier Data */
    this.supplierTableData$ = this._supplierListFacade.suppliers$.pipe(
      map(x=>{
        if(x){
          return x.map(
            supplier => {
              return{
                id:supplier.id,
                company:supplier.companyName,
                name:supplier.agentName,
                email:supplier.agentEmail,
                phone:supplier.agentPhoneNumber,
                address:supplier.address
              }
            }
          )
        }
      })
    )
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

  
  eventPagination_ordertList(){
    switch (this.orderListType) {
      case 'asset':
        this._facadeOrderList.loadOrderPartforAsset()
        break;
      case 'sub-asset':
        this._facadeOrderList.loadOrderPartforSubAsset()
        break;
    }
  }


  eventPagination_supplierList(){
    this._supplierListFacade.loadAll();
  }

  ngOnDestroy(){
    this.requestStatisticsSubscription.unsubscribe();
    this.orderStatisticsSubscription.unsubscribe();
  }

}
