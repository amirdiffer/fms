import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faChartBar ,  faDollarSign , faChartLine, faCheck} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'anms-active-assets',
  templateUrl: './active-assets.component.html',
  styleUrls: ['./active-assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveAssetsComponent implements OnInit {
  faChartBar = faChartBar;
  faDollarSign= faDollarSign;
  faChartLine=faChartLine;
  faCheck= faCheck;

  chartData=[];
  constructor() { }

  ngOnInit(): void {
    this.chartData = [
      {bgColor: '#B1E4E3',color: '#2fb9b7',icon:this.faChartBar ,title: 'Permanent', count: '118000',total:'120000'},
      {bgColor: '#39DA8A',color: '#1fb068',icon:this.faDollarSign, title: 'I-Serve', count: '80000' ,total:'90000'},
      {bgColor: '#F1EB9C',color: '#cfc322',icon:this.faChartLine,  title: 'Shared Pool', count: '650000',total:'1000000'},
      {bgColor: '#FF5B5C',color: '#FF5B5C', icon:this.faCheck, title: 'Temporary', count: '3800000',total:'4500000'},
      {bgColor: '#009EFF',color: '#009EFF', icon:this.faCheck, title: 'Workshop', count: '250000',total:'350000'},
    ]
  }

}
