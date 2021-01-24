import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() setting: FilterCardSetting[];

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(index: number): void {

    const isCardActive = this.setting[index].isActive;

    if (isCardActive) {
      this.onDeActivate(index);
      return;
    }

    this.setting.forEach((card) => {
      if (card.isActive) {
        card.isActive = false;
        card.filterBackgroundColor = '#fff';
      }
    });

    this.setting[index].filterBackgroundColor = this.setting[index].filterTagColor;
    this.setting[index].isActive = true;
  }

  onDeActivate(index: number): void {
    const card = this.setting[index];
    card.isActive = false;
    card.filterBackgroundColor = '#fff';
  }
}

export interface FilterCardSetting {
  filterTitle: string;
  filterCount: string;
  filterTagColor: string;
  filterBackgroundColor?: string;
  isActive?: boolean;

  onActive?(index: number): void;
}
