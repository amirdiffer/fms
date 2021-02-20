import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  ContentChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabViewComponent implements OnInit {
  @Output('selectedIndex') selectedIndex: EventEmitter<
    string
  > = new EventEmitter<string>();
  @ViewChild('content', { static: false }) element: ElementRef;
  tabs: { index: number; title: string ; translationTitle? : string;}[] = [];
  initialized: boolean = false;
  elements: HTMLElement[];
  selectedTab: number = 0;
  constructor(public cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.elements = this.element.nativeElement.children;
    let tabs = [];
    
    if (this.elements.length > 0) {
      for (let i = 0; i < this.elements.length; i++) {
        let titleTranslate =this.elements[i].attributes.getNamedItem('translation');
        tabs.push({
          index: i,
          title: this.elements[i].attributes.getNamedItem('title').nodeValue,
          translationTitle : titleTranslate ? titleTranslate.nodeValue: false
        });
      }
    }
    console.log(tabs)
    this.tabs = tabs;
    this.initialized = true;
    this.selectedTabChanged();
    this.cd.detectChanges();
  }

  selectedTabChanged() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.remove('hidden-item');

      if (i != this.selectedTab) {
        this.elements[i].classList.add('hidden-item');
      }
    }
  }

  selectTab(index: number, title: string) {
    this.selectedTab = index;
    this.selectedIndex.emit(title);
    this.selectedTabChanged();
  }
}
