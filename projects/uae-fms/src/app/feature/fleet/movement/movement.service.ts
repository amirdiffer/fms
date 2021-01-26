import { Injectable } from '@angular/core';
import { IMovementOverView, IRequests } from './movement.model';


@Injectable({
  providedIn: 'root'
})
export class MovementService {
    private  movmentOverViewData = () :IMovementOverView [] =>{
        const data = [];
        for (let index = 0; index < 9; index++) {
          const el = {
                asset:{
                  img:'thumb1.png',
                  assetName:'Asset Name',
                  assetSubName: 'DPD 0000001',
                  ownership: 'Owned',
                },
                duration: '2 Days',
                startDate: 'Saturday 02/02 12:30',
                endDate: 'Saturday 02/02 12:30',
                department: 'Department Name',
                operator:{
                    name:'Sam Smith',
                    subName:'123456'
                },
                fine: 3,
                reason: 'Reason is here',
              };
          data.push(el)
        }
      return data
    }

    public movmentOverViewTableSetting = () =>{
    return  {
        columns:[
        {
            lable: 'Asset',
            field: 'asset',
            width: 140,
            type:1,
            thumbField: '',
            renderer: 'assetsRenderer'
        },
        {
            lable: 'Duration',
            field: 'duration',
            width: 100,
            type:1,
            thumbField: '',
            renderer: ''
        },
        {
            lable: 'Start Date',
            field: 'startDate',
            width: 100,
            type:1,
            thumbField: '',
            renderer: ''
        },
        {
            lable: 'Department',
            field: 'department',
            width: 100,
            type:1,
            thumbField: '',
            renderer: ''
        },
        {
            lable: 'Operator',
            field: 'operator',
            width: 100,
            type:1,
            thumbField: '',
            renderer: 'subtextRenderer'
        },
        {
            lable: 'Fine',
            field: 'fine',
            width: 100,
            type:1,
            thumbField: '',
            renderer: ''
        },
        {
            lable: 'Reason',
            field: 'reason',
            width: 100,
            type:1,
            thumbField: '',
            renderer: ''
        },

        ],
        data: this.movmentOverViewData(),

    }
    }

    private requestData = () : IRequests [] =>{
        const data = [];
        for (let index = 0; index < 9; index++) {
          const el = {
                user:{
                  img:'user-image.png',
                  userName:'Sam Smith',
                  subName: '123456789',
                },
                movementType: 'Temporary',
                requestType: 'Replacement',
                assetType: 'Car',
                reason: 'Reason is Here',
                date: 'Saturday 02/02 12:30',
                requestStatus: 'Waiting For Approval',
                operation:{
                    accept:'Confirm',
                    cancel:'Reject',
                }

              };
          data.push(el)
        }
      return data
    }

    public requestTableSetting = () =>{
        return  {
            columns:[
            {
                lable: 'User',
                field: 'user',
                width: 140,
                type:1,
                thumbField: '',
                renderer: 'assetsRenderer'
            },
            {
                lable: 'Movement Type',
                field: 'movementType',
                width: 100,
                type:1,
                thumbField: '',
                renderer: ''
            },
            {
                lable: 'Request Type',
                field: 'requestType',
                width: 100,
                type:1,
                thumbField: '',
                renderer: ''
            },
            {
                lable: 'Asset Type',
                field: 'assetType',
                width: 100,
                type:1,
                thumbField: '',
                renderer: ''
            },
            {
                lable: 'Reason',
                field: 'reason',
                width: 100,
                type:1,
                thumbField: '',
                renderer: ''
            },
            {
                lable: 'Date',
                field: 'date',
                width: 100,
                type:1,
                thumbField: '',
                renderer: ''
            },
            {
                lable: 'Request Status',
                field: 'requestStatus',
                width: 100,
                type:1,
                thumbField: '',
                renderer: ''
            },
            {
                lable: '',
                field: '',
                width: 150,
                type:1,
                thumbField: '',
                renderer: 'operation'
            },
    
            ],
            data: this.requestData(),
    
        }
        }
  constructor() { }
}
