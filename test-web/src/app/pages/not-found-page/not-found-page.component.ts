import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss'
})
export class NotFoundPageComponent {
  constructor(private route: Router){}

  goBack(){
    this.route.navigate(['login']); 
  }

}
