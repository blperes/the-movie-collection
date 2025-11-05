import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const movieServiceMock = jasmine.createSpyObj('MoviesService', ['getMovieById']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        { provide: MoviesService, useValue: movieServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'tt0372784' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    moviesServiceSpy = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('the component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovieById with the path ID and assign the movie', () => {
    const mockMovie = { Title: 'Batman Begins', Year: '2005' };
    moviesServiceSpy.getMovieById.and.returnValue(of(mockMovie));

    component.ngOnInit();

    expect(moviesServiceSpy.getMovieById).toHaveBeenCalledWith('tt0372784');
    expect(component.movie).toEqual(mockMovie);
  });

  it('should handle an error if getMovieById fails', () => {
    const consoleSpy = spyOn(console, 'error');
    moviesServiceSpy.getMovieById.and.returnValue(throwError(() => new Error('Error de red')));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should navigate to /movie-list when executing returnToList()', () => {
    component.returnToList();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie-list']);
  });
});
