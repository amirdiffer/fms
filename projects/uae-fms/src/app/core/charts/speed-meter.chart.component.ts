import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-speed-meter-chart',
    template: `
        <div class="chart-container">
            <div class="gauge-container">   
                <img class="gauge" src="../../../assets/gauge.svg"/>
                <img class="arrow" src="../../../assets/gauge-arrow.svg"/>
                <span class="text">
                    <h3 class="blue">480.26</h3>
                    <h6>KB/SEC</h6>
                </span>
            </div>  
        </div>  
    `,
    styles: [
        `
            .text{
                margin-top:-20px;
                text-align: center;
            }

            .blue{
                color:#289fff;
            }

            .chart-container{
                width:100%;
                display:flex;
                justify-content:center;
                padding: 25px;
            }

            .gauge-container{
                position:relative;
                width:max-content;
            }

            .arrow{
                position: absolute;
                left: 83px;
                top: 86px;
                transform: rotate(97deg);
            }
        `
    ]
})

export class SpeedMeterChartComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}