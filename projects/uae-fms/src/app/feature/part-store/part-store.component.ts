import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-part-store',
  templateUrl: './part-store.component.html',
  styleUrls: ['./part-store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartStoreComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
