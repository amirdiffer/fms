import { NgModule } from '@angular/core';
import { LinearComponent } from "./linear.chart.component";
import { LifeCycleComponent } from "./life-cycle.chart.component";
import { ChartsModule as ChartModule } from 'ng2-charts';
import { CommonModule } from "@angular/common";
import { SpeedMeterChartComponent } from "./speed-meter.chart.component";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [ChartModule, CommonModule , TranslateModule],
    exports: [LinearComponent, LifeCycleComponent, SpeedMeterChartComponent],
    declarations: [LinearComponent, LifeCycleComponent, SpeedMeterChartComponent],
    providers: [],
})
export class ChartsModule { }