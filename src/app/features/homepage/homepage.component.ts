import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private router: Router) {
  }

  navToMovieList() {
    this.router.navigate(['/movie-list']);
  }
}
