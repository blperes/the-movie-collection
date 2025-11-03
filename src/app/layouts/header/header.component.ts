import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(private moviesService: MoviesService) {}
  onSearch() {
    this.moviesService.setSearchTerm(this.searchTerm);
  }
}
