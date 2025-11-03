import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {CommonModule, NgFor, AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, NgFor, AsyncPipe],
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})

export class MovieListComponent implements OnInit {

  movies: any[] = [];
  searchTerm: string = '';

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.searchTerm$.subscribe(term => {
      this.searchTerm = term;

      if (term && term.trim() !== '') {
        this.moviesService.searchMovies(term).subscribe((data: any) => {
          this.movies = data.Search || [];
        });
      } else {
        this.movies = [];
      }
    });
  }
}
