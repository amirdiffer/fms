import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { PartListFacade } from '../+state/part-list';
import { PartMasterFacade } from '../+state/part-master';

@Component({
  selector: 'anms-part-overview',
  templateUrl: './part-overview.component.html',
  styleUrls: ['./part-overview.component.scss']
})
export class PartOverviewComponent implements OnInit {
  id: number;
  @ViewChild('selectedImage', { static: false }) element: ElementRef;

  constructor(private _router: Router, 
              private _route: ActivatedRoute,
              private _facadePartList : PartListFacade,
              private _facadePartMaster:PartMasterFacade
              ) {
    
  }

  ngOnInit(): void {
    let url = this._route.snapshot.url;
    let fleetType = this._route.snapshot.queryParams.fleetType;
    this.id = +url[url.length -1].path;
    if(fleetType){
      switch (fleetType) {
        case 'asset':
          this._facadePartList.loadAllAssetPartList(this.id);
          this._facadePartMaster.loadSpecificItemOfAsset(this.id)

          break;
        case 'sub-asset':
          this._facadePartList.loadAllSubAssetPartList(this.id);
          this._facadePartMaster.loadSpecificItemOfSubAsset(this.id)
          break;
      }
    }
    this._facadePartList.assetPartList$.subscribe(x=>{console.log(x)})
    this._facadePartList.specificAssetPart$.subscribe(x=>{console.log(x)})
  }

  changeImage(event) {
    this.element.nativeElement.src = event.target.src;
  }
}
