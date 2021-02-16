import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';

@Component({
  selector: 'anms-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit {
  activeTab = 'Request List';
  downloadBtn= 'assets/icons/download-solid.svg';
  filterCard1: FilterCardSetting[] = [
    {
      filterTitle: '',
      filterCount: '',
      filterTagColor: '',
      isCalendar: true,
      onActive(index: number) {}
    },
    {
      filterTitle: 'Total',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Available',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Unavailable',
      filterCount: '02',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    }
  ];
  filterCard2: FilterCardSetting[] = [
    {
      filterTitle: 'This Month',
      filterCount: '',
      filterTagColor: '',
      isCalendar: true,
      onActive(index: number) {}
    },
    {
      filterTitle: 'Total',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Approved',
      filterCount: '08',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Waiting',
      filterCount: '02',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Rejected',
      filterCount: '09',
      filterTagColor: '#DD5648',
      onActive(index: number) {}
    }
  ];

  requestList_Table: TableSetting = {
    columns: [
      { lable: 'Item', type: 1, field: 'Item' },
      { lable: 'Part ID', type: 1, field: 'Part_ID' },
      { lable: 'Status', type: 1, field: 'Status', renderer: 'statusRenderer' },
      { lable: 'Cost', type: 1, field: 'Cost' },
      { lable: 'Quantity', type: 1, field: 'Quantity' },
      { lable: 'Department', type: 1, field: 'Department' },
      { lable: 'Description', type: 1, field: 'Description' },
      { lable: 'Date', type: 1, field: 'Date' },
      { lable: 'Total', type: 1, field: 'Total' },
      { lable: '', type: 1, field: 'ButtonReject', renderer: 'buttonRenderer' },
      { lable: '', type: 1, field: 'ButtonApprove', renderer: 'buttonRenderer' }
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
      { lable: 'Item', type: 1, field: 'Item' },
      { lable: 'Part ID', type: 1, field: 'Part_ID' },
      { lable: 'Quantity', type: 1, field: 'Quantity' },
      { lable: 'Date', type: 1, field: 'Date' },
      { lable: 'Description', type: 1, field: 'Description' },
      {
        lable: 'Expected Receive date',
        type: 1,
        field: 'Expected_Receive_date'
      },
      { lable: 'Cost', type: 1, field: 'Cost' },
      { lable: 'Total', type: 1, field: 'Total' },
      { lable: 'Status', type: 1, field: 'Status', renderer: 'statusRenderer' },
      { lable: '', type: 1, field: 'ButtonRecived', renderer: 'buttonRenderer' }
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
      { lable: 'Company', type: 1, field: 'Company' },
      { lable: 'Name', type: 1, field: 'Name' },
      { lable: 'Email', type: 1, field: 'Email' },
      { lable: 'Phone', type: 1, field: 'Phone' },
      { lable: 'Address', type: 1, field: 'Address' },
      { lable: 'Quotation', type: 1, field: 'Quotation' }
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
