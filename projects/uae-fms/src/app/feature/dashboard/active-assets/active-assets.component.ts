import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anms-active-assets',
  templateUrl: './active-assets.component.html',
  styleUrls: ['./active-assets.component.scss']
})
export class ActiveAssetsComponent implements OnInit {
  chartData = [];
  translations = {
    'dashboard.permanent': '',
    'dashboard.iserve': '',
    'dashboard.shared_poll': '',
    'dashboard.temporary': '',
    'dashboard.workshop': ''
  };

  constructor(private translationService: TranslateService) {
    this.getTranslations();
  }

  getTranslations() {
    const translationLabels = Object.keys(this.translations);
    this.translationService.get(translationLabels).subscribe((translation) => {
      this.translations = translation;
    });
  }

  ngOnInit(): void {
    this.chartData = [
      {
        bgColor: '#B1E4E3',
        color: '#2fb9b7',
        icon: 'assets/icons/chart-bar.svg',
        title: this.translations['dashboard.permanent'],
        count: '118000',
        total: '120000'
      },
      {
        bgColor: '#39DA8A',
        color: '#1fb068',
        icon: 'assets/icons/dollar.svg',
        title: this.translations['dashboard.iserve'],
        count: '80000',
        total: '90000'
      },
      {
        bgColor: '#F1EB9C',
        color: '#cfc322',
        icon: 'assets/icons/shared-pool.svg',
        title: this.translations['dashboard.shared_poll'],
        count: '650000',
        total: '1000000'
      },
      {
        bgColor: '#FF5B5C',
        color: '#FF5B5C',
        icon: 'assets/icons/check2.svg',
        title: this.translations['dashboard.temporary'],
        count: '3800000',
        total: '4500000'
      },
      {
        bgColor: '#009EFF',
        color: '#009EFF',
        icon: 'assets/icons/check2.svg',
        title: this.translations['dashboard.workshop'],
        count: '250000',
        total: '350000'
      }
    ];
  }
}
