import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../models/camera';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  constructor(private http: HttpClient) {}

  getCameraList(): Observable<Camera[]>{
    return this.http.get<Camera[]>('example_data/camera_list.json');
  }
}
