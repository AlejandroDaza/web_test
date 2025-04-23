import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApexOptions, NgApexchartsModule , ApexAxisChartSeries, ApexChart, ApexXAxis} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};



@Component({
  selector: 'app-trends-graph',
  imports: [NgApexchartsModule],
  templateUrl: './trends-graph.component.html',
  styleUrl: './trends-graph.component.scss'
})


export class TrendsGraphComponent  {
 
  @Input() chartData: any;
  @Input() chartCategories: any;

  chartOptions: Partial<ChartOptions>;
  chartSeries: ApexAxisChartSeries;


  // chartOptions: ApexOptions = {
  //   chart: {
  //     id: 'chart1',
  //     type: 'line', 
  //   },
  //   xaxis: {
  //     categories: []  // Categorías vacías inicialmente
  //   },
  //   series: [
  //     {
  //       name: 'Serie 1',
  //       data: []  // Datos vacíos inicialmente
  //     }
  //   ]
  // };


  constructor(){
    this.chartSeries = [
      {
        name: '',
        data: []
      }
    ];

    this.chartOptions = {
      chart: {
        type: 'line',
        height: 500,        
      },
      xaxis: {
        categories: []
      }
      
    };
  }

  

 
  ngOnChanges() {
    if (this.chartData) {
      this.chartSeries = this.chartData;

      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          categories: this.chartCategories
        }
      };

    }
  }

}
