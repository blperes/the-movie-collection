import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockSearchTerm$: BehaviorSubject<string>;

  beforeEach(async () => {
    mockSearchTerm$ = new BehaviorSubject<string>('');

    const movieServiceMock = jasmine.createSpyObj('MoviesService', ['searchMovies'], {
      searchTerm$: mockSearchTerm$.asObservable(),
    });
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        { provide: MoviesService, useValue: movieServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    moviesServiceSpy = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('the component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should leave movies empty if the search term is empty', () => {
    component.ngOnInit();

    mockSearchTerm$.next('');

    expect(component.movies).toEqual([]);
    expect(component.isLoaded).toBeTrue();
    expect(moviesServiceSpy.searchMovies).not.toHaveBeenCalled();
  });

  it('should call the service and assign movies if there is a search term', () => {
    const mockResponse = {
      Search: [{ Title: 'Batman Begins', Year: '2005' }],
    };

    moviesServiceSpy.searchMovies.and.returnValue(of(mockResponse));

    component.ngOnInit();

    mockSearchTerm$.next('Batman');

    expect(moviesServiceSpy.searchMovies).toHaveBeenCalledWith('Batman');
    expect(component.movies).toEqual(mockResponse.Search);
    expect(component.isLoaded).toBeTrue();
  });

  it('should navigate to the movie details with showMovieDetails()', () => {
    component.showMovieDetails('id123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie', 'id123']);
  });
});
