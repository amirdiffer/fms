import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anms-sub-asset-detail',
  templateUrl: './sub-asset-detail.component.html',
  styleUrls: ['./sub-asset-detail.component.scss']
})
export class SubAssetDetailComponent implements OnInit {
  @Input() data: Observable<any>;
  id: number;
  warranty$: Observable<any> = of([]);
  subAsset$: Observable<any> = of({
    title: '',
    vin_sn: '',
    subAssetType: '',
    make: '',
    model: '',
    created: '',
    policyType: '',
    purchaseValue: '',
    avatar: 'assets/thumb.png',
  });
  selectedWaranty = 0
  constructor(private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._activateRoute.snapshot.params?.id
    if (this.data) {
      this.data.subscribe(x => {
        if (x) {
          console.log(x);
          this.warranty$ = of(x.warrantyItems);
          this.subAsset$ = of({
            ...x,
            title: x.make + " " + x.model,
            vin_sn: x.vin_sn,
            subAssetType: x.subAssetType,
            make: x.make,
            model: x.model,
            created: x.created,
            policyType: x.policyType,
            purchaseValue: x.purchaseValue,
            avatar: x.avatar !== null ? environment.baseApiUrl + `document/${x.avatar}` : 'assets/thumb.png',
          })
        }
      })
    }

  }

  clickWarranty(index) {
    this.selectedWaranty = index
  }

}
