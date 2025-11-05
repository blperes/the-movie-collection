import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-header-without-searchbox',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './header-without-searchbox.component.html',
  styleUrl: './header-without-searchbox.component.css'
})
export class HeaderWithoutSearchboxComponent {

  constructor() {
  }

}
