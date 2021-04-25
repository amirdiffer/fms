import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anms-sub-asset-detail',
  templateUrl: './sub-asset-detail.component.html',
  styleUrls: ['./sub-asset-detail.component.scss']
})
export class SubAssetDetailComponent implements OnInit {
  subAsset={
    title:'Camera No 34567',
    vin_sn:'JTDJASDKJBJJ123123S',
    subAssetType:'Gear',
    make:'BMW',
    model:'C12',
    year:'02/02/2020',
    origin:'Germany',
    policyType:'Policy name is here',
    purchaseValue:'28000 AED',
    warrantyItems:'Engine',
    warrantyStartDate:'02/02/2020',
    warrantyDuration:'2'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
