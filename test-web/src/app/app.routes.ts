import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component'
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RealTimeViewPageComponent } from './pages/real-time-view-page/real-time-view-page.component';
import { DataAnalyticsPageComponent } from './pages/data-analytics-page/data-analytics-page.component';
import { DetectionsPageComponent } from './pages/detections-page/detections-page.component';
import { ComputerVisionPageComponent } from './pages/computer-vision-page/computer-vision-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';


export const routes: Routes =[ 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    component: LoginPageComponent
  }, 
  {
    path: 'home-page', component: LayoutComponent,    
    children: [
      { path: '', component: HomePageComponent },
      
    ]
  }, 
  {
    path: 'realtimeview-page', component: LayoutComponent,    
    children: [
      { path: '', component: RealTimeViewPageComponent },
      
    ]
  }, 
  {
    path: 'dataanalytics-page', component: LayoutComponent,    
    children: [
      { path: '', component: DataAnalyticsPageComponent },
      
    ]
  },
  {
    path: 'detections-page', component: LayoutComponent,    
    children: [
      { path: '', component: DetectionsPageComponent },
      
    ]
  }, 
  {
    path: 'computervision-page', component: LayoutComponent,    
    children: [
      { path: '', component: ComputerVisionPageComponent },
      
    ]
  }, 
  {
    path: '**',
    title: 'Not Found',
    component: NotFoundPageComponent
  }

];