import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule, MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import { forkJoin } from 'rxjs';

import { CamerasService } from '../../services/cameras.service';
import { Camera } from '../../models/camera';




@Component({
  selector: 'app-data-analytics-page',
  imports: [MatTabsModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './data-analytics-page.component.html',
  styleUrl: './data-analytics-page.component.scss'
})
export class DataAnalyticsPageComponent implements OnInit{
  //data para manejo de los tabs 
  activeCameraTab: number = 1 // activo por defecto
  tabs: any[] = [];  // Array para los tabs de nivel principal
  selectedTabId: number = 1;  // Tab principal seleccionado por defecto

  //información obtenida desde las apis
  cameraList: Camera[] = [];

  //info de fechas para búsqueda
  dateStart= '';
  dateEnd= '';

  constructor(
    private camerasService: CamerasService,
  ){}

  ngOnInit() {  
    //se obtiene listado de camaras  
    const apiCallCameras = this.camerasService.getCameraList();

    forkJoin([apiCallCameras]).subscribe(
      ([_cameraList]) =>{
        this.cameraList = _cameraList;

        this.createTabStructure();
      },
      error =>{
        // Manejo de errores
        console.error('Error al hacer las llamadas a las APIs', error);
      }
    )
  }

  onCameraTabChange(event:any){
    this.activeCameraTab = event.index + 1;   
    this.selectedTabId = event.index +1;
  }

  createTabStructure(){
    this.cameraList.forEach(cam => {
      let currentTab = { 
        id: cam.id,
        name: cam.camera_name,
        imageAnalytics: ""      
      };
      this.tabs.push(currentTab)      
    });   
  }

  addDateStart(type: string, event: MatDatepickerInputEvent<Date>) { 
    this.dateStart = event.value != null ? event.value.toDateString() : '';   
  }

  addDateEnd(type: string, event: MatDatepickerInputEvent<Date>) {    
    this.dateEnd = event.value != null ? event.value.toDateString() : '';    
  }

  SearchAnalytics(event : number){

    let currentCam =event -1;
    
    //solo se puede buscar si las fechas están correctas
    //TODO: mostrar error por pantalla que fechas incorrectas, rangos incorrectos
    if(this.dateStart != '' && this.dateEnd != ''){
      
      //mètodo que simula obtener una imagen desde servidor obteniendo
      let imageName = this.getImageForCamera(currentCam+1);

      this.tabs[currentCam].imageAnalytics = "data_analytics/"+ imageName;
    }

  }

  private getImageForCamera(currentCam : number){
    let letterArray : string[] = ['a','b', 'c','d'];
    const indiceAleatorio = Math.floor(Math.random() * letterArray.length);
    let imageName = "cam" + currentCam + "-" + letterArray[indiceAleatorio] + ".png";
    return imageName; 
  }


}
