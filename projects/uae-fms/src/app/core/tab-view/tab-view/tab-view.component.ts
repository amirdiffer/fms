import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  Renderer2,
  OnDestroy, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss'],
})
export class TabViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('selectedTab') selectedTab: number = 0;
  @Input('returnId') returnId: string = 'title';
  @Input() index?: boolean = true;
  @Input() container?: boolean = false;
  @Output('selectedIndex') selectedIndex: EventEmitter<
    string
  > = new EventEmitter<string>();
  @ViewChild('content', { static: false }) element: ElementRef;
  @ViewChild('tabsHeader', { static: true }) tabsHeader: ElementRef;
  tabs: { index: number; title: string; id?: string; count?: number }[] = [];
  initialized: boolean = false;
  elements: HTMLElement[];
  // selectedTab: number = 0;
  selectedParams;
  routeObsvr$: Subscription;
  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _renderer: Renderer2,
    // private _cd:ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.elements = this.element.nativeElement.children;
      let tabs = [];
      if (this.elements.length > 0) {
        for (let i = 0; i < this.elements.length; i++) {
          let tabID = this.elements[i].attributes.getNamedItem('id');
          tabs.push({
            index: i,
            title: this.elements[i].attributes.getNamedItem('title').nodeValue,
            id: tabID ? tabID.nodeValue : null,
            count:0
          });
        }
      }

      this.tabs = tabs;
      this.initialized = true;
      this.routeObsvr$ = this._activateRoute.queryParams.subscribe((id) => {
        id['id']
          ? (this.selectedParams = id['id'])
          : (this.selectedParams = this.tabs[0].id);

          this.selectByUrlParams();
          this.selectedIndex.emit(
            this.returnId == 'title' ? this.selectedParams : this.selectedTab
          );

      });
    }, 0);

  }
  ngAfterViewChecked(){
    if(this.initialized && this.elements.length > 0){
      for (let i = 0; i < this.elements.length; i++){
        let countAttr = this.elements[i].attributes.getNamedItem('count');
        if(this.tabs[i].count == 0 && +countAttr.nodeValue > 0){
          console.log(countAttr.nodeValue)
          this.tabs[i].count = +countAttr.nodeValue
        }
      }
      // if (this.elements.length > 0 ){
        // for (let i = 0; i < this.elements.length; i++){
        //   let countAttr = this.elements[i].attributes.getNamedItem('count');
        //   console.log( this.tabs[i].count);
        //   if(this.tabs[i].count == 0){
        //     console.log( this.tabs[i].count);
        //     if(+countAttr.nodeValue > 0){
        //       this.tabs[i].count = +countAttr.nodeValue
        //     }
        //   }
          // if(this.tabs[i].count = 0 && +countAttr.nodeValue > 0){
          //   this.tabs[i].count = +countAttr.nodeValue
          // }
          // if(+countAttr.nodeValue > 0){
          //   this.tabs[i].count = +countAttr.nodeValue
          // }
        // }
      // }
      // this._cd.detectChanges()
    }
  }
  selectedTabChanged() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.remove('hidden-item');
      if (i != this.selectedTab) {
        this.elements[i].classList.add('hidden-item');
      }
    }
  }

  selectByUrlParams() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add('hidden-item');
      if (this.elements[i].getAttribute('id') == this.selectedParams) {
        this.selectedTab = i;
        this.elements[i].classList.remove('hidden-item');
      }
    }
    for (
      let i = 0;
      i < this.tabsHeader.nativeElement.children.length - 1;
      i++
    ) {
      this._renderer.setAttribute(
        this.tabsHeader.nativeElement.children[i],
        'for',
        this.tabs[i].id ? this.tabs[i].id : ''
      );
      this.tabsHeader.nativeElement.children[i].getAttribute('for') ==
      this.selectedParams
        ? (this._renderer.addClass(
            this.tabsHeader.nativeElement.children[i],
            'active-tab'
          ),
          (this.selectedTab = i))
        : this._renderer.removeClass(
            this.tabsHeader.nativeElement.children[i],
            'active-tab'
          );
    }
  }
  selectTab(index: number, title: string, e: Event) {
    this.selectedTab = index;

    for (
      let i = 0;
      i < this.tabsHeader.nativeElement.children.length - 1;
      i++
    ) {
      this._renderer.removeClass(
        this.tabsHeader.nativeElement.children[i],
        'active-tab'
      );
    }
    (e.target as HTMLElement).classList.add('active-tab');
    this.selectedIndex.emit(
      this.returnId == 'title' ? title : index.toString()
    );
    this._router.navigate([], { queryParams: { id: title } });
    this.selectedTabChanged();
  }

  ngOnDestroy(): void {
    this.routeObsvr$.unsubscribe();
  }
}
