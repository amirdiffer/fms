import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() setting: FilterCardSetting[];

  cardSetting: FilterCard[];
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.cardSetting = this.setting.map((filterCardSetting) => {
      return { setting: filterCardSetting };
    });
  }

  onClick(index: number): void {
    this.cardSetting.forEach((card) => {
      if (card.isActive) {
        card.isActive = false;
        card.filterBackgroundColor = 'transparent';
      }
    });

    this.cardSetting[index].filterBackgroundColor = this.cardSetting[
      index
    ].setting.filterTagColor;
    this.cardSetting[index].isActive = true;
  }
}

export interface FilterCardSetting {
  filterTitle: string;
  filterSupTitle?: string;
  filterCount: string;
  filterTagColor: string;
  isCalendar?: boolean;
  onActive(index: number): void;
}

interface FilterCard {
  setting: FilterCardSetting;
  filterBackgroundColor?: string;
  isActive?: boolean;
}
