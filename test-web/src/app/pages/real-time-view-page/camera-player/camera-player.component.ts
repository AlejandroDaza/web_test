import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-camera-player',
  imports: [MatButtonModule],
  templateUrl: './camera-player.component.html',
  styleUrl: './camera-player.component.scss'
})

export class CameraPlayerComponent {
  @Input() streamUrl!: string;

  //streamUrl = 'http://190.101.183.23:9516/control/faststream.jpg?stream=full&fps=16&rand=196112';
  isPlaying = true;
  showbuttons= false;
  
  play() {
    this.isPlaying = true;
  }
  
  pause() {
    this.isPlaying = false;
  }
}
