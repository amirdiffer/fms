import { Component, OnInit } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { TableSetting } from '@core/table';
import { ButtonType } from '@core/table/table.component';
import { MyOrderSubAssetFacade } from '@feature/part-store/+state/order-list/my-order/sub-asset';
import { Router } from '@angular/router';
import { SuppliersFacade } from '@feature/part-store/+state/order-list/suppliers';
import { RequestListFacade, RequestListService } from '@feature/part-store/+state/order-list/request';

@Component({
  selector: 'anms-order-list-sub-asset',
  templateUrl: './order-list-sub-asset.component.html',
  styleUrls: ['./order-list-sub-asset.component.scss']
})
export class OrderListSubAssetComponent implements OnInit {
  isSuppliersAddFormHidden = true;

  activeTab = 'request_list';
  downloadBtn = 'assets/icons/download-solid.svg';
  filterCard1: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.this_month',
      filterCount: '',
      filterTagColor: '',
      isCalendar: true,
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.requests',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterSupTitle: 'statistic.requests',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterSupTitle: 'statistic.requests',
      filterCount: '02',
      filterTagColor: '#BA7967',
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
      { lable: 'tables.column.item', type: 1, field: 'Item' },
      { lable: 'tables.column.part_id', type: 1, field: 'Part_ID' },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'Status',
        renderer: 'statusRenderer'
      },
      { lable: 'tables.column.cost', type: 1, field: 'Cost', sortable: true },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'Quantity',
        sortable: true
      },
      { lable: 'tables.column.department', type: 1, field: 'Department' },
      { lable: 'tables.column.description', type: 1, field: 'Description' },
      { lable: 'tables.column.date', type: 1, field: 'Date' },
      { lable: 'tables.column.total', type: 1, field: 'Total' },
      {
        lable: '',
        type: 1,
        field: 'ButtonReject',
        renderer: 'rejectButton',
        width: 40,
        buttonType: ButtonType.orderListReject,
        showOnHover: true
      },
      {
        lable: '',
        type: 1,
        field: 'ButtonApprove',
        renderer: 'approveButton',
        width: 50,
        buttonType: ButtonType.approve,
        showOnHover: true
      }
    ],
    data: [
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        Item: 'Item No 123456',
        Part_ID: '1234567899',
        Status: 'Available',
        Cost: '100 AED',
        Quantity: '2',
        Department: 'Department Name',
        Description: 'Description is here',
        Date: '02/02/2020',
        Total: '1000 AED',
        ButtonReject: 'Reject',
        ButtonApprove: 'Approve'
      }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {
        if (button === 'approve') {
        } else {
        }
      }
    }
  };
  myOrder_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.request_id', type: 1, field: 'Item' },
      { lable: 'tables.column.part_id', type: 1, field: 'Part_ID' },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'Quantity',
        sortable: true
      },
      { lable: 'tables.column.date', type: 1, field: 'Date' },
      { lable: 'tables.column.description', type: 1, field: 'Description' },
      {
        lable: 'tables.column.expected_receive_date',
        type: 1,
        field: 'Expected_Receive_date'
      },
      { lable: 'tables.column.cost', type: 1, field: 'Cost', sortable: true },
      { lable: 'tables.column.total', type: 1, field: 'Total', sortable: true },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'Status'
      },
      {
        lable: '',
        type: 1,
        width: 180,
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
            this.router.navigate(['/part-store/order-list/edit-order-list/' + col.id], { queryParams: { type: 'sub-asset' } }).then();
          }
        } else {
          this.router.navigate(['/part-store/order-list/receive-order/' + col.id],
            { queryParams: { fleetType: 'sub-asset' } }).then();
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
        type: 1,
        field: 'Quotation',
        sortable: true
      }
    ],
    data: [
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      },
      {
        Company: 'BMW',
        Name: 'Sam Smith',
        Email: 'Sample@sample.com',
        Phone: '05050505050505',
        Address: 'Silicon Oasis, Dubai',
        Quotation: '89'
      }
    ]
  };

  constructor(private facade: MyOrderSubAssetFacade, private suppliersFacade: SuppliersFacade, private requestListFacade: RequestListFacade,
              private router: Router,
              private requestListService: RequestListService) {
  }

  ngOnInit(): void {
    this.facade.loadAll();
    this.suppliersFacade.loadAll();
    this.suppliersFacade.suppliers$.subscribe((response) => {
      this.suppliers_Table.data = [];
      response.map((supplier) => {
        this.suppliers_Table.data.push({
          Company: supplier.companyName,
          Name: supplier.agentName,
          Email: supplier.agentEmail,
          Phone: supplier.agentPhoneNumber,
          Address: supplier.address,
          Quotation: '89'
        });
      });
    });

    this.requestListFacade.requestList$.subscribe((response) => {
    });
  }
}
