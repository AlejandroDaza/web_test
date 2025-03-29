import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { Camera } from '../../models/camera';
import { CamerasService } from '../../services/cameras.service';

@Component({
  selector: 'app-real-time-view-page',
  imports: [MatTabsModule, MatCardModule],
  templateUrl: './real-time-view-page.component.html',
  styleUrl: './real-time-view-page.component.scss'
})
export class RealTimeViewPageComponent implements OnInit {

  cameraList: Camera[] = [];

  constructor(private camerasService: CamerasService) {}

  ngOnInit() {
    this.camerasService.getCameraList().subscribe((data) => {
      this.cameraList = data;
    });

    console.log(this.cameraList)
  }
}
