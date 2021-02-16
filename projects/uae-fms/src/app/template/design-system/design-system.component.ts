import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'anms-design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignSystemComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  isEditable: boolean = true;
  isLinear: boolean = true;
  @ViewChild('stepper') stepper: MatStepper;
  controlStep: FormGroup;
  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];
  assets: any[] = [
    { name: 'Item No 234567890', gps: '456783234658' },
    { name: 'Item No 234567891', gps: '666663345435' },
    { name: 'Item No 234567892', gps: '567434234244' },
    { name: 'Item No 234567893', gps: '541565456465' },
    { name: 'Item No 234567894', gps: '489456141856' }
  ];
  filteredAsset: any[];
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.controlStep = this._fb.group({});
  }

  searchAsset(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.assets.length; i++) {
      let asset = this.assets[i];
      if (asset.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(asset);
      }
    }
    this.filteredAsset = filtered;
  }
}
