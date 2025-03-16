import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  _environment = environment;

  //backgroundImage = '/web_test/fondo_Login.png';

  backgroundImage = this._environment.loginBackground;

  constructor(private route: Router){}


  loginAnonymous(){
    this.route.navigate(['home']);  
  }
}
