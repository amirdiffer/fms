import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'anms-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  tabsImg = [`assets/icons/surface1.svg`];
  supplierCharts = [];
  fileServerBase = environment.baseFileServer;
  constructor() {}

  ngOnInit(): void {
    this.supplierCharts = [
      {
        title: 'BWM',
        imgSrc: `${this.fileServerBase}bmw.png`,
        number: '123456789',
        percent: '45'
      },
      {
        title: 'BWM',
        imgSrc: `${this.fileServerBase}bmw.png`,
        number: '123456789',
        percent: '70'
      },
      {
        title: 'BWM',
        imgSrc: `${this.fileServerBase}bmw.png`,
        number: '123456789',
        percent: '80'
      },
      {
        title: 'BWM',
        imgSrc: `${this.fileServerBase}bmw.png`,
        number: '123456789',
        percent: '20'
      }
    ];
  }
}
