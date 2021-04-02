import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-life-cycle-chart',
    templateUrl:'life-cycle.chart.component.html',
    styleUrls:['life-cycle.chart.component.scss']
})

export class LifeCycleComponent implements OnInit {
    nowYears=2023;
    lifeCycleData:ILifeCycle[]=[
        {
            year:2020,
            mileage:'00km',
            service:[
                {title:1},
                {title:2},
                {title:3},
            ]
        },
        {
            year:2021,
            mileage:'50km',
            service:[
                {title:1},
                {title:2},
                {title:3},
            ]
        },
        {
            year:2022,
            mileage:'100km',
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
            mileage:'150km',
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
            mileage:'200km',
            service:[
                {title:1},
                {title:2},
                {title:4},
            ]
        },
        {
            year:2025,
            mileage:'250km',
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