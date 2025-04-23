import { AfterViewInit, Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { Camera } from '../../models/camera';
import { CamerasService } from '../../services/cameras.service';
import { ApexOptions, NgApexchartsModule } from "ng-apexcharts";
import { Temperature } from '../../models/temperature';
import { TemperaturesService } from '../../services/temperatures.service';
import { TrendsGraphComponent } from "./trends-graph/trends-graph.component";
import { Camera_Temperature_Data } from '../../models/camera_temperature_data';
import { forkJoin } from 'rxjs';
import { CameraPlayerComponent } from "./camera-player/camera-player.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { Data_Table_Example } from '../../models/data_table_example';

@Component({
  selector: 'app-real-time-view-page',
  imports: [MatTabsModule, MatCardModule, NgApexchartsModule, CameraPlayerComponent, TrendsGraphComponent, DataTableComponent],
  templateUrl: './real-time-view-page.component.html',
  styleUrl: './real-time-view-page.component.scss'
})
export class RealTimeViewPageComponent implements OnInit  {

  //data para manejo de los tabs
  activeCameraTab: number = 1 // activo por defecto
  activeGraphTab: number = 1 //activo por defecto
  tabsStructure: any[] = [] // estructura que maneja los tabs

  //información obtenida desde las apis
  cameraList: Camera[] = [];
  temperaturesList: Temperature[] = [];
  dataList: Camera_Temperature_Data[] = [];
  cameraNotAvailableUrl: string = "no_data_info/camera_no_available.png";
  dataNotAvailableUrl: string = "no_data_info/no_data.png";





  loadingCameras: boolean = true;
  loadingTemperatures: boolean = true;
  loadingData: boolean = true;


  chartData: any = [];





 // chartSeries = [{ name: "Ventas", data: [10, 40, 35, 50, 49, 60, 70, 91, 125] }];
 // chartOptions: ApexOptions | null = null; 
  chartCategoriesList: any[] = [];
  chartSeriesList: any[] = [];
  







  tabs: any[] = [];  // Array para los tabs de nivel principal
  chartOptions: any = {};  // Opciones para cada gráfico
  selectedTabId: number = 1;  // Tab principal seleccionado por defecto
  selectedSubTabId: number = 1;  // Sub-tab seleccionado por defecto










  constructor(
    private camerasService: CamerasService,
    private temperaturesService: TemperaturesService

  ) {}

  ngOnInit() {  

    //se obtiene listado de camaras  
    const apiCallCameras = this.camerasService.getCameraList();
    //se obtiene listado de temperaturas
    const apiCallTemperatures = this.temperaturesService.getTemperaturesList();
    //se obtiene la informaciòn de los registro de temperatura
    const apiCallData = this.temperaturesService.getFilteredTemperaturesByCamera(1);

    forkJoin([apiCallCameras,apiCallTemperatures,apiCallData]).subscribe(
      ([resultCameras, resultTemp, resultData]) =>{
        this.cameraList = resultCameras;
        this.temperaturesList = resultTemp.filter(x=>x.isActive);
        this.dataList = resultData;
        this.createTabStructure();
      },
      error => {
        // Manejo de errores
        console.error('Error al hacer las llamadas a las APIs', error);
      }
      
    )
 
  }

  createTabStructure(){
    this.cameraList.forEach(cam => {
      let currentTab = { 
        id: cam.id,
        name: cam.camera_name,
        streaming_url: cam.streaming_url,
        isActive: cam.isActive,
        subTabs: []
      };
      this.tabs.push(currentTab)      
    }); 

    this.createSubTabsStructure();
  }

  createSubTabsStructure(){
    this.tabs.forEach(currentTab => {
      let data1: any[]  =[];
      let data2: any[]  =[];
      let data3: Data_Table_Example[] = []

      //TODO: llamar a mètodos uqe generan la data para graficos y tabla
      if(currentTab.isActive == "true"){
        data1 = this.loadThrendGraphData(currentTab.id );
        data3 = this.loadDataTable(currentTab.id);
      }

      let tab1 = {id: 1, name: "Trends", chartType: 'line', data: data1, dataTable : data3 };
    //  let tab2 = {id: 2, name: "Histogram", chartType: 'line', data: [] , dataTable: []};
   //   let tab3 = {id: 3, name: "Data_Table", chartType: 'line', data: data3, dataTable : data3};

      currentTab.subTabs.push(tab1);
     // currentTab.subTabs.push(tab2);
     // currentTab.subTabs.push(tab3);
    });

  }

  onCameraTabChange(event:any){
    this.activeCameraTab = event.index + 1;   
  }

  onGraphTabChange(event: any){
    this.activeGraphTab = event.index +1; 
  }

 


  loadThrendGraphData(tabId: number){
    let categoriesList: any[] = [];
    let serieAux: any[] = [];
    const dataCameraFiltered = this.dataList.filter(x=>x.camera_id === tabId);
    

    //se obtienen todas las fechas para la info de la camara activa
    const dataDates = dataCameraFiltered.map(x=>x.observation_date);

    //Se filtra la data de las fechas quitanto repetidos  (quizas esto no se deba realizar)
    const uniqueDates = [...new Set(dataDates)];

    categoriesList = uniqueDates.map(fechaStr => {
      const fecha = new Date(fechaStr!);
      const horas = fecha.getHours().toString().padStart(2, '0');
      const minutos = fecha.getMinutes().toString().padStart(2, '0');
      return `${horas}:${minutos}`;
    });   

    this.temperaturesList.forEach(temp => {
      if(temp.isActive.valueOf().toString() == "true"){
        const dataTempFiltered = dataCameraFiltered.filter(x=>x.temperature_id == temp.id);       
        const dataTempMaped = dataTempFiltered.map(x=>x.value);   

        let tempName = "";
        if(temp.name == "Temp1"){
          tempName = "Temp. Max.";
        }else{
          tempName = "Temp. Min.";
        }        
        

        let currentSerieData = { name: tempName, data: dataTempMaped }
        serieAux.push(currentSerieData);
      }
      
    }); 

    let data: any = {
      categories: categoriesList,
      serie: serieAux
    }

    return data;
  }

  loadDataTable(tabId: number){
    let dateList: any[] = [];
    let tempList: any[] = [];
    let dataResult: Data_Table_Example[] = []

    const dataCameraFiltered = this.dataList.filter(x=>x.camera_id === tabId);  
    //se obtienen todas las fechas para la info de la camara activa
    const dataDates = dataCameraFiltered.map(x=>x.observation_date);
    //Se filtra la data de las fechas quitanto repetidos  (quizas esto no se deba realizar)
    const uniqueDates = [...new Set(dataDates)];

    dateList = uniqueDates.map(fechaStr => {
      const fecha = new Date(fechaStr!);
      const horas = fecha.getHours().toString().padStart(2, '0');
      const minutos = fecha.getMinutes().toString().padStart(2, '0');
      return `${horas}:${minutos}`;
    });   

    this.temperaturesList.forEach(temp => {
      if(temp.isActive.valueOf().toString() == "true"){
        const dataTempFiltered = dataCameraFiltered.filter(x=>x.temperature_id == temp.id);       
        const dataTempMaped = dataTempFiltered.map(x=>x.value);       
        let currentSerieData = { name: temp.name, data: dataTempMaped }
        tempList.push(currentSerieData);
      }
      
    }); 

    for (let index = 0; index < dateList.length; index++) {
      let newData: Data_Table_Example = {
        id: index+1,
        hour: dateList[index],
        temp1: tempList[0].data[index],
        temp2: tempList[1].data[index],
      }
      dataResult.push(newData);      
    }
    return dataResult;
  }


}
