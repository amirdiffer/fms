import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-asset-detail',
  templateUrl: './asset-car-detail.component.html',
  styleUrls: ['./asset-car-detail.component.scss']
})
export class AssetCarDetailComponent implements OnInit, OnChanges {
  @Input() asset: any;
  @Input() asset$: Observable<any>;
  @Input() type;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.asset$) {
      this.asset$.subscribe(x => {
        if (x && x.message) {
          console.log(x)
          this.asset = x.message;
          this.changeDetector.detectChanges();
        }
      })
    }
  }
  ngOnChanges() { }
}
