import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-life-cycle-chart',
    template: `
        <img style="width:100%; position:relative;" src="../../../assets/life-cycle.svg"/>
    `,
    styles: [
        `        
        .linear-chart-container{
            display:flex;
            flex-direction: column;
        }
        .linear-chart-average{
            height:30px;
            margin:0 auto 140px;
            position:relative;
        
        }
        .linear-chart-average__title{
            display:block;
            width:auto;
            color:#333333;
            font-weight:600;
            font-size:22px;
            margin-bottom:10px;
        }
        .linear-chart-average__line{
            width: 1px;
            height: 135px;
            display: block;
            margin: 0;
            border-left: 1px dashed #666;
            left: 50%;
            position: absolute;
        }
        .linear-chart{
            width:100%;
            display:flex;
        }
        .linear-chart__line{
            width: 90%;
            height: 1px;
            background:#888888;
            position:absolute;
            left:5%;
            right:5%;
        }
        .linear-chart__dots{
            list-style-type:none;
            margin-top:-10px;
            top:50px;
            }
        
        .linear-chart__dot{
            border-radius:50%;
            background-color: #fff;
            border: 1px solid #e5e5e5;  
            height: 17px;	
            width: 17px;
            display:block;
        }
        .linear-chart__dot:after{
            content:"";
            display:block;
            width:8px;
            height:8px;
            background-color:#666;
            border-radius:50%;
            position:relative;
            top:4px;
            margin-left:4px;;
        }
        .linear-chart__dots:before{
            content:"";
            display:block;
            height:20px;
            border-left: 1px dashed #666;
            position:absolute;
            top:12px;
            left:8px;
        
        }
        .linear-chart__dots:nth-child(odd):before{
            top:-15px;
            left:9px;
        }
        
        .linear-chart__dots--below:nth-child(odd):before, 
        .linear-chart__dots--below:before{
            border-left: 1px dashed #4B912B;
        
        }
        .linear-chart__dots--middle:nth-child(odd):before, 
        .linear-chart__dots--middle:before{
            border-left: 1px dashed #FFB414;
        
        }
        .linear-chart__dots--above:nth-child(odd):before, 
        .linear-chart__dots--above:before{
            border-left: 1px dashed #C80000;
        
        }
        .linear-chart--below:after,
        .linear-chart--below:before{
            background-color:#4B912B;
        }
        .linear-chart--middle:after{
            background-color:#FFB414;
        }
        .linear-chart--above:after{
        background-color:#C80000;
        }
        
        .linear-chart__tickscontainer{
            width:100%;
            position:relative;
        }
        .linear-chart__tickmarks{
            display:flex;
            width:100%;
        
        }
        .linear-chart__tick{
            display:block;
            position:relative;
            list-style-type: none;
            color: #333333;
            font-size: 14px;
            line-height: 19px;	
            width:130px;
            padding:0;
            text-align:center;
            margin-top:30px;
        }
        
        .linear-chart__tick:nth-child(odd){
            top: -90px;
            margin-top: 0;
        }
        
        .linear-chart__tickstart{
            margin-right:auto;
            list-style-type: none;
            font-weight:600;
        }
        
        .linear-chart__tickend{
            margin-left:auto;
            list-style-type: none;
            font-weight:600;
        }
        
        .linear-chart--modelacr{
            font-weight:600;
        }
        
        `
    ]
})

export class LifeCycleComponent implements OnInit {


    order = []
    data = {

        projectAcr: 42,
        lowest: 39,
        highest: 45,
        currency: "USD",
        modelAcrs: [
            {
                modelName: "E-commerce database",
                acr: 39.50,
                acrLevel: "below"
            },
            {
                modelName: "Website",
                acr: 39.88,
                acrLevel: "below"
            },
            {
                modelName: "App",
                acr: 41,
                acrLevel: "middle"
            },
            {
                modelName: "AMS for sale support",
                acr: 43.20,
                acrLevel: "above"
            },
            {
                modelName: "AMS for client support",
                acr: 43.50,
                acrLevel: "above"
            },
            {
                modelName: "Infrastructure migration",
                acr: 44.44,
                acrLevel: "above"
            },
        ]
    }

    setColor(level) {
        console.log(level)
        return level === 'below' ? 'linear-chart--below' : level === 'middle' ? 'linear-chart--middle' : 'linear-chart--above';

    }
    calcAlign(idx) {
        let percentage = this.order[idx];
        let position = `calc( ${percentage}% - 85px)`;
        return position;
    }

    orderNumbers() {
        let distance = this.data.highest - this.data.lowest;
        let newarr = this.data.modelAcrs.map(model => Math.round((model.acr - this.data.lowest) * 100 / distance));

        return newarr;
    }

    constructor() { }

    ngOnInit() {
        this.order = this.orderNumbers();
    }
}