import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { ButtonType } from '@core/table/table.component';

@Component({
  selector: 'anms-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit {
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
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
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
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.approved',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.waiting',
      filterCount: '02',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.rejected',
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
      { lable: 'tables.column.cost', type: 1, field: 'Cost',sortable: true },
      { lable: 'tables.column.quantity', type: 1, field: 'Quantity',sortable: true },
      { lable: 'tables.column.department', type: 1, field: 'Department' },
      { lable: 'tables.column.description', type: 1, field: 'Description' },
      { lable: 'tables.column.date', type: 1, field: 'Date' },
      { lable: 'tables.column.total', type: 1, field: 'Total' },
      {
        lable: '',
        type: 1,
        field: 'ButtonReject',
        renderer: 'button',
        buttonType: ButtonType.reject,
        showOnHover: true,
        sortable: true
      },
      {
        lable: '',
        type: 1,
        field: 'ButtonApprove',
        renderer: 'button',
        buttonType: ButtonType.approve,
        showOnHover: true
      }
    ],
    data: [
      {
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
    ]
  };
  myOrder_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.item', type: 1, field: 'Item' },
      { lable: 'tables.column.part_id', type: 1, field: 'Part_ID' },
      { lable: 'tables.column.quantity', type: 1, field: 'Quantity' ,sortable: true},
      { lable: 'tables.column.date', type: 1, field: 'Date' },
      { lable: 'tables.column.description', type: 1, field: 'Description' },
      {
        lable: 'tables.column.expected_receive_date',
        type: 1,
        field: 'Expected_Receive_date'
      },
      { lable: 'tables.column.cost', type: 1, field: 'Cost' ,sortable: true},
      { lable: 'tables.column.total', type: 1, field: 'Total',sortable: true },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'Status',
        renderer: 'statusRenderer'
      },
      {
        lable: '',
        type: 1,
        field: 'ButtonRecived',
        renderer: 'button',
        buttonType: ButtonType.receive,
        showOnHover: true
      }
    ],
    data: [
      {
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
    ]
  };
  suppliers_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.company', type: 1, field: 'Company' },
      { lable: 'tables.column.name', type: 1, field: 'Name' },
      { lable: 'tables.column.email', type: 1, field: 'Email' },
      { lable: 'tables.column.phone', type: 1, field: 'Phone' },
      { lable: 'tables.column.address', type: 1, field: 'Address' },
      { lable: 'tables.column.quotation', type: 1, field: 'Quotation',sortable: true }
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

  constructor() {}

  ngOnInit(): void {}
}
