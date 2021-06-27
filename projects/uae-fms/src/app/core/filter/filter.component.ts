import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() setting: FilterCardSetting[];
  @Input() filterCardSettingDelegate!: FilterCardSetting;
  @Input() flexible: boolean = false;
  @ViewChild('statistics') statistics : ElementRef;
  @ViewChild('statisticButton') statisticButton : ElementRef;
  chartIcon = 'assets/icons/chart-bar.svg';
  cardSetting: FilterCard[];
  showStatistics: boolean = true;
  constructor(private _renderer : Renderer2) {}

  ngOnInit(): void {}

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

  showAndHide(){
    this.showStatistics 
    ? 
    (
      this._renderer.setStyle(this.statistics.nativeElement , 'height' , '0'),
      this.showStatistics = false,
      this._renderer.addClass(this.statisticButton.nativeElement ,'button-show')
    )
    :
    (
      this._renderer.setStyle(this.statistics.nativeElement , 'height' , '3.2em'),
      this.showStatistics = true,
      this._renderer.removeClass(this.statisticButton.nativeElement ,'button-show')
    )

    
  }
}

export interface FilterCardSetting {
  filterTitle?: string;
  filterSupTitle?: string;
  filterCount?: string | number;
  filterTagColor?: string;
  isCalendar?: boolean;
  field?: string;
  onActive?(index: number): void;
}

interface FilterCard {
  setting: FilterCardSetting;
  filterBackgroundColor?: string;
  isActive?: boolean;
}
