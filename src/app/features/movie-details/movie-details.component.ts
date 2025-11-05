import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService) { }

  returnToList(){
    this.router.navigate(['/movie-list']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.moviesService.getMovieById(id).subscribe({
      next: (data: any) => {
        this.movie = data;
      },
      error: (err) => {
        console.error('Error al obtener detalles de la película:', err);
      }
    });
    }

}
