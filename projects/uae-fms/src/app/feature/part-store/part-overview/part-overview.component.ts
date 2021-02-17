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
  @ViewChild('selectedImage', { static: false }) element: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  changeImage(event) {
    this.element.nativeElement.src = event.target.src;
  }
}
