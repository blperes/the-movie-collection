import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {

}
