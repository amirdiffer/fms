import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'configuration-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetCategoryComponent implements OnInit {
  constructor(
    private _dataService:DataService,
    private _fb:FormBuilder
  ) {}
  form:FormGroup
  ngOnInit(): void {
    this.form = this._fb.group({
      type:['']
    })
    this._dataService.watchType().subscribe(
      (x) => {
        if(x){
          this.form.patchValue({
            type: x
          })
        }
      }
    );
  }
  typeCategory(event){
    this._dataService.selectType(event)
  }
}
