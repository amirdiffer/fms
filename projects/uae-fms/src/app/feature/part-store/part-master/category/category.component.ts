import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'part-store-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
