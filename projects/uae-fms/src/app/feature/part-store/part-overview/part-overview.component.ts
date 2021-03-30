import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';

@Component({
  selector: 'anms-part-overview',
  templateUrl: './part-overview.component.html',
  styleUrls: ['./part-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartOverviewComponent implements OnInit {
  recordId: number;
  @ViewChild('selectedImage', { static: false }) element: ElementRef;

  constructor(private _router: Router, private _route: ActivatedRoute) {
    this._route.queryParamMap.subscribe((params) => {
      this.recordId = +params.get('id');
    });
  }

  ngOnInit(): void {}

  changeImage(event) {
    this.element.nativeElement.src = event.target.src;
  }
}
