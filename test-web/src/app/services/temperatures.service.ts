import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Temperature } from '../models/temperature';
import { Camera_Temperature_Data } from '../models/camera_temperature_data';

@Injectable({
  providedIn: 'root'
})
export class TemperaturesService {

  desde = new Date('2025-01-10 12:00:00');
  hasta = new Date('2025-01-10 12:30:00');

  constructor(private http: HttpClient) {}

  getTemperaturesList(): Observable<Temperature[]>{
    return this.http.get<Temperature[]>('example_data/temperature_list.json');    
  }

  getTemperaturesData(): Observable<Camera_Temperature_Data[]>{
    //return this.http.get<Camera_Temperature_Data[]>('example_data/camera_temperature_data_list.json');
    return this.http.get<Camera_Temperature_Data[]>('example_data/temperature_january_2025.json');
  }

  getFilteredTemperaturesByCamera(cameraId: number): Observable<Camera_Temperature_Data[]>{
    return this.getTemperaturesData().pipe(
        map(data =>
            data.filter(temp => 
            {
              const dentroDeRango = new Date(temp.observation_date!)>= this.desde && new Date(temp.observation_date!)<= this.hasta;
              return temp.camera_id === cameraId && dentroDeRango
            })
        )
    );
  }

  // getFilteredTemperaturesByCameraTemperature(cameraId: number, temperatureId: number): Observable<Camera_Temperature_Data[]>{
  //   return this.getTemperaturesData().pipe(
  //       map(data =>
  //           data.filter(temp => temp.camera_id === cameraId && temp.temperature_id=== temperatureId)
  //       )
  //   );
  // }

  getFilteredTemperaturesByCameraTemperature(cameraId: number, temperatureId: number): Observable<Camera_Temperature_Data[]>{
    return this.getTemperaturesData().pipe(
        map(data =>
            data.filter(temp => {
              const dentroDeRango = new Date(temp.observation_date!)>= this.desde && new Date(temp.observation_date!)<= this.hasta;
              return temp.camera_id === cameraId && temp.temperature_id === temperatureId && dentroDeRango
            })
        )
    );
  }
}
