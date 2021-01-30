import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'configuration-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetCategoryComponent implements OnInit {
  categories = [ 'Asset' , 'Sub Asset' , 'Accessory'];
  constructor() { }

  ngOnInit(): void {
  }

}