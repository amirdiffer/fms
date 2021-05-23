import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableSetting } from '@core/table';
import { AssetPolicyService } from '@feature/configuration/+state/asset-policy';
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
  id:number;
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
    data: [
      {
        depreciationValue:'%20',
        maxUsageYear:'After 5 years',
        maxUsageKPHour:'-'
      },
      {
        depreciationValue:'',
        maxUsageYear:'02/02/2020',
        maxUsageKPHour:'-'
      }
    ]
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
    data: [
      {
        year:1,
        bookValue:'43000 AED'
      },
      {
        year:2,
        bookValue:'39000 AED'
      },
      {
        year:3,
        bookValue:'36000 AED'
      },
      {
        year:4,
        bookValue:'16000 AED'
      },
      {
        year:5,
        bookValue:'0 AED'
      }
    ]
  };
  constructor(private _activatedRoute:ActivatedRoute,
              private _subAssetFacede: SubAssetFacade,
              private _assetPolicy:AssetPolicyService) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id
    if(this.id){
      this._subAssetFacede.getSpecificSubAsset(this.id)
      // this._subAssetFacede.specificSubAsset$.subscribe(x =>{console.log(x)})
      this.subAssetdata$ =  this._subAssetFacede.specificSubAsset$.pipe(
        map(x=>{
          if(x){
            console.log(x)
            return {
              title:'Camera No 34567',
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
  }

}
