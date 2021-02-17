import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-active-assets',
  templateUrl: './active-assets.component.html',
  styleUrls: ['./active-assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveAssetsComponent implements OnInit {

  chartData = [];
  constructor() {}

  ngOnInit(): void {
    this.chartData = [
      {
        bgColor: '#B1E4E3',
        color: '#2fb9b7',
        icon: 'assets/icons/chart-bar.svg',
        title: 'Permanent',
        count: '118000',
        total: '120000'
      },
      {
        bgColor: '#39DA8A',
        color: '#1fb068',
        icon: 'assets/icons/dollar.svg',
        title: 'I-Serve',
        count: '80000',
        total: '90000'
      },
      {
        bgColor: '#F1EB9C',
        color: '#cfc322',
        icon: 'assets/icons/shared-pool.svg',
        title: 'Shared Pool',
        count: '650000',
        total: '1000000'
      },
      {
        bgColor: '#FF5B5C',
        color: '#FF5B5C',
        icon: 'assets/icons/check2.svg',
        title: 'Temporary',
        count: '3800000',
        total: '4500000'
      },
      {
        bgColor: '#009EFF',
        color: '#009EFF',
        icon: 'assets/icons/check2.svg',
        title: 'Workshop',
        count: '250000',
        total: '350000'
      }
    ];
  }
}
