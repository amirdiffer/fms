import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-life-cycle-chart',
    templateUrl:'life-cycle.chart.component.html',
    styleUrls:['life-cycle.chart.component.scss']
})

export class LifeCycleComponent implements OnInit {
    @Input() hasCalendar:boolean = false;
    nowYears=new Date().getFullYear();
    @Input() lifeCycleData:ILifeCycle[]=[
        {
            year:2020,
            mileage:'',
            service:[
                {title:1},
                {title:2},
                {title:3},
            ]
        },
        {
            year:2021,
            mileage:'',
            service:[
                {title:1},
                {title:2},
                {title:3},
            ]
        },
        {
            year:2022,
            mileage:'',
            service:[
                {title:1},
                {title:2},
                {title:3},
                {title:4},
                {title:5},
                {title:6},
                {title:7},
            ]
        },
        {
            year:2023,
            mileage:'',
            service:[
                {title:1},
                {title:2},
                {title:3},
                {title:4},
                {title:5},
                {title:6},
                {title:7},
            ]
        },
        {
            year:2024,
            mileage:'',
            service:[
                {title:1},
                {title:2},
                {title:4},
            ]
        },
        {
            year:2025,
            mileage:'',
            service:[]
        }
    ]
    constructor() { }

    ngOnInit() {
    }
}
export interface ILifeCycle{
    year:number;
    mileage:string;
    service:any[];
}