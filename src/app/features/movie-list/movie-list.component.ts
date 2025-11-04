import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {CommonModule, NgFor} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, NgFor],
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})

export class MovieListComponent implements OnInit {

  movies: any[] = [];
  searchTerm: string = '';
  isLoaded: boolean = false;

  constructor(private moviesService: MoviesService, private router: Router) { }

  showMovieDetails(id: string) {
    this.router.navigate(['/movie', id]);

  }



  ngOnInit() {
    this.moviesService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.isLoaded = false;

      if (term && term.trim() !== '') {
        this.moviesService.searchMovies(term).subscribe((data: any) => {
          this.movies = data.Search || [];
          this.isLoaded = true;
        });
      } else {
        this.movies = [];
        this.isLoaded = true;
      }
    });
  }

}
