import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'part-store-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  folderFillSvg = 'assets/icons/folder-fill.svg';
  folderRegularSvg = 'assets/icons/folder-regular.svg';
  constructor() {}

  ngOnInit(): void {}
}
