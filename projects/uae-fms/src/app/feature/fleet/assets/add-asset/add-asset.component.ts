import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAssetComponent implements OnInit {
  isEditable: boolean = true;
  isLinear: boolean = true;
  isStart: boolean = true;

  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];

  constructor() {}

  ngOnInit(): void {}
}
