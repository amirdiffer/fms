import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroy, ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { PartListFacade } from '../+state/part-list';
import { PartMasterFacade } from '../+state/part-master';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPartMasterItem } from '@models/part-store.model';
import { ColumnType, TableSetting } from '@core/table';
import { environment } from '@environments/environment'
@Component({
  selector: 'anms-part-overview',
  templateUrl: './part-overview.component.html',
  styleUrls: ['./part-overview.component.scss']
})
export class PartOverviewComponent implements OnInit , OnDestroy {
  id: number;
  fleetType;
  partId:number;
  itemId:number;
  isUpdate;
  item$:Observable<IPartMasterItem> = of({
    categoryName:'',
    description:'',
    makeName:'',
    modelName:'',
    name:''
  })
  partListItemTableData$:Observable<any>;
  specificPartSubscription:Subscription;
  specificItemSubscription:Subscription;
  images$:Observable<any>;
  partListItemTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.room',
        type: ColumnType.lable,
        field: 'room',
      },
      {
        lable: 'tables.column.quantity',
        type: ColumnType.lable,
        field: 'quantity',
      },
      {
        lable: 'tables.column.price',
        type: ColumnType.lable,
        field: 'price',
      },
      {
        lable: 'tables.column.warranty_expire_date',
        type: ColumnType.lable,
        field: 'warrantyExpireDate',
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        renderer: 'floatButton'
      },
      
    ],
    data:[],
    rowSettings: {
      floatButton: [
        {
          button: 'edit',
          onClick: (col, data, button?) => {
            this.isUpdate=true;
            this._router.navigate(['update/' + data.id] , {relativeTo:this.route , queryParams: { fleetType: this.fleetType.toLowerCase()}} );
          },
        }
      ]
    }
  }
  @ViewChild('selectedImage', { static: false }) element: ElementRef;

  constructor(private _router: Router, 
              public route: ActivatedRoute,
              private _facadePartList : PartListFacade,
              private _facadePartMaster:PartMasterFacade
              ) {
  }

  ngOnInit(): void {
    const childrenRoute = this.route.snapshot.children
    if(this.route.snapshot.children.length > 0 && !this.fleetType && childrenRoute[childrenRoute.length -1].params.id){
      this.partId = +childrenRoute[childrenRoute.length -1].params.id
      this._facadePartList.loadSpecificPartOfAsset(this.partId);
    }
    this.fleetType = this.route.snapshot.queryParams.fleetType;
    this.id = +this.route.snapshot.params.id;
    if(this.fleetType){
      this.checkFleetType();
    }

    this.specificItemSubscription = this._facadePartMaster.specificItem$.subscribe(
      x=>{
        if(x){
          if(x.documentIds !== null && x.documentIds.length == 0){
            this.images$ = of([{address:'assets/camera.png'}])
          }else{
            this.images$ = of(x.documentIds.map(x =>{
              return {
                address:  environment.baseApiUrl + `document/${x}`
              }
            }))
          }
          this.item$ = of(x)
        }
      }
    )
  }
  checkFleetType(){
    switch (this.fleetType) {
      case 'asset':
        this._facadePartList.loadAllAssetPartList(this.id);
        this._facadePartMaster.loadSpecificItemOfAsset(this.id);
        this.partListItemTableData$ = this._facadePartList.assetPartList$.pipe(
          map(x =>{
            if(x){
              return x.map(
                 item => {
                  return {
                    ...item,
                    price: item.price + ' AED',
                    warrantyExpireDate : new Date(item.warrantyExpireDate).toLocaleString().split(',')[0]
                  }
                }
              )
            }
          })
        )
        break;
      case 'sub-asset':
        this._facadePartList.loadAllSubAssetPartList(this.id);
        this._facadePartMaster.loadSpecificItemOfSubAsset(this.id);
        this.partListItemTableData$ = this._facadePartList.subAssetPartList$.pipe(
          map(x =>{
            if(x){
              return x.map(
                 item => {
                  return {
                    ...item,
                    price: item.price + ' AED',
                    warrantyExpireDate : new Date(item.warrantyExpireDate).toLocaleString().split(',')[0]
                  }
                }
              )
            }
          })
        )
        break;
    }
  }
  changeImage(event) {
    this.element.nativeElement.src = event.target.src;
  }

  eventPagination_partListItem(){
    switch (this.fleetType) {
      case 'asset':
        this._facadePartList.loadAllAssetPartList(this.id);
        break;
      case 'sub-asset':
        this._facadePartList.loadAllSubAssetPartList(this.id);
        break;
    }
  }
  ngOnDestroy(){
  }
}
