import { Component, computed, HostListener, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

export type sidenavMenuItem = {
  icon: string;
  label: string;
  route: string;
};



@Component({
  selector: 'app-layout',
  imports: [RouterModule, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
    MatListModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
 

  menuItems : sidenavMenuItem[] =[
    { icon: 'dashboard', label: 'Home', route: '/home-page' },
    { icon: 'running_with_errors', label: 'Real Time View', route: '/realtimeview-page' },
    { icon: 'analytics', label: 'Data Analytics', route: '/dataanalytics-page' },
    { icon: 'center_focus_weak', label: 'Detections', route: '/detections-page' },
    { icon: 'dvr', label: 'Computer Vision', route: '/computervision-page' }
  ]
    

}
