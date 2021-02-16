import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRequestComponent implements OnInit {
  requestForm: FormGroup;
  assetTypes = [
    { name: 'Asset type 1', id: 1 },
    { name: 'Asset type 2', id: 2 },
    { name: 'Asset type 3', id: 3 },
    { name: 'Asset type 4', id: 4 },
    { name: 'Asset type 5', id: 5 },
    { name: 'Asset type 6', id: 6 }
  ];
  oldAssetSuggests = [
    { name: 'Old asset type 1', id: 1 },
    { name: 'Old asset type 2', id: 2 },
    { name: 'Old asset type 3', id: 3 },
    { name: 'Old asset type 4', id: 4 },
    { name: 'Old asset type 5', id: 5 },
    { name: 'Old asset type 6', id: 6 }
  ];
  constructor(private _fb: FormBuilder) { }
 
  ngOnInit(): void {
    this.requestForm = this._fb.group({
      requestType: ['new'],
      assetType: [''],
      resone: [''],
      quality: [''],
      oldAssetType: ['']
    });
  }
  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.oldAssetSuggests = [
      { name: 'Old asset type 1', id: 1 },
      { name: 'Old asset type 2', id: 2 },
      { name: 'Old asset type 3', id: 3 },
      { name: 'Old asset type 4', id: 4 },
      { name: 'Old asset type 5', id: 5 },
      { name: 'Old asset type 6', id: 6 }
    ];
  }

}
