import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILifeCycle } from '@core/charts/life-cycle.chart.component';
import { TableSetting } from '@core/table';
import { AssetPolicyFacade } from '@feature/configuration/+state/asset-policy/asset';
import { SubAssetFacade } from '@feature/fleet/+state/sub-asset';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IReminders, IRemindersType } from './reminder/reminder.component';

@Component({
  selector: 'anms-sub-asset-overview',
  templateUrl: './sub-asset-overview.component.html',
  styleUrls: ['./sub-asset-overview.component.scss']
})
export class SubAssetOverviewComponent implements OnInit {
  subAssetdata$:Observable<any> = of(null);
  policyTypeTableData$:Observable<any>;
  calculateTableData$:Observable<any>;
  id:number;
  purchaseValue:number;
  startDate;
  assetPolicy:any;
  lifeCycleData:ILifeCycle[]
  reminderData:IReminders[] =[
    {
      title:'Text Text',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.over
    },
    {
      title:'Service appointment',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    },
    {
      title:'GPS Alert system service',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    },
    {
      title:'Monthly check up',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    },
    {
      title:'Upgrade tracking sysem',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    },
    {
      title:'Sterilization',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.urgent
    },
    {
      title:'Upgrade tracking system',
      date:'15 MAR 2019',
      time:'02:08PM',
      type:IRemindersType.normal
    }
  ]

  reviewPlaneSettingTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'depreciationValue',
        renderer: ''
      },
      {
        lable: 'tables.column.out_of_policy',
        type: 1,
        field: 'maxUsageYear',
        renderer: ''
      },
      {
        lable: 'tables.column.out_of_policy',
        type: 1,
        field: 'maxUsageKPHour',
        renderer: ''
      }
    ],
    data: []
  };
  reviewPlaneSettingTable2: TableSetting = {
    columns: [
      {
        lable: 'tables.column.year',
        type: 1,
        width: 100,
        field: 'year',
        renderer: ''
      },
      {
        lable: 'tables.column.book_value',
        type: 1,
        field: 'bookValue',
        renderer: ''
      }
    ],
    data: []
  };
  constructor(private _activatedRoute:ActivatedRoute,
              private _subAssetFacede: SubAssetFacade,
              private _assetPolicyFacade:AssetPolicyFacade) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;
    this.policyTypeTableData$ = this._assetPolicyFacade.specific$.pipe(
      map(x => {
        if(x){
          this.assetPolicy = x;
          this.calculate();
          return [
            {
              depreciationValue:`%${x.depreciationValue}`,
              maxUsageYear:`After ${x.maxUsageYear} ${x.maxUsageYear < 2 ? 'Year' : 'Years'}`,
              maxUsageKPHour:`After ${x.maxUsageKPHour} km/h`
            }
          ]
        }
      })
    )
    if(this.id){
      this._subAssetFacede.getSpecificSubAsset(this.id)
      this.subAssetdata$ =  this._subAssetFacede.specificSubAsset$.pipe(
        map(x=>{
          if(x){
            this.purchaseValue = x.purchaseValue
            this._assetPolicyFacade.specific(x.policyTypeId);
            this.startDate = new Date(x.createdAt *1000).getUTCFullYear()
            return {
              title:`Sub Asset No.${x.serialNumber}`,
              vin_sn: x.serialNumber,
              subAssetType: x.subAssetConfigurationName,
              make:x.subAssetMakeName,
              model:x.subAssetModelName,
              created:new Date(x.createdAt *1000).toLocaleString().split(',')[0],
              policyType:x.policyTypeName,
              purchaseValue:x.purchaseValue,
              warrantyItems:x.warranties.map(
                warranty => {
                  return {
                    ...warranty,
                    startDate:new Date(warranty.startDate *1000).toLocaleString().split(',')[0],
                  }
                }
              ),
              avatar:x.avatarId
            }
          }
        })
      );

    }
  };

  calculate(){
    let depreciationValue = this.assetPolicy.depreciationValue,
        maxUsageKPHour = this.assetPolicy.maxUsageKPHour,
        maxUsageYear = this.assetPolicy.maxUsageYear,
        purchaseValue = this.purchaseValue,
        tableData = [];
    for (let index = 0; index < maxUsageYear; index++) {
      let value = Math.round((purchaseValue * depreciationValue) / 100);
      purchaseValue = purchaseValue - value;
      tableData.push({
        year:index+1,
        bookValue:`${(((purchaseValue * depreciationValue) / 100) < 1) ? '0' :purchaseValue} AED`
      })
      if(((purchaseValue * depreciationValue) / 100) < 1) break;
    }
    this.reviewPlaneSettingTable2.data = tableData
    this.calculateTableData$ = of(tableData);
    let LifeCycle =[];
    let service = []
    let year = this.startDate;
    if(maxUsageYear > 1) {
      for (let i = 0; i < maxUsageYear; i++) {
        service.push({title:i})
      }
    }
    for (let index = 0; index <  4; index++) {
      LifeCycle.push({
        year:year,
        mileage:'',
        service: index < 3 ? service : []
      });
      year = year + maxUsageYear;
    }
    this.lifeCycleData = LifeCycle
  }

}
