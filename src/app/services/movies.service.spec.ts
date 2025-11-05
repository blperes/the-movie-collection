import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  const apiKey = '56799494';
  const apiUrl = 'http://www.omdbapi.com/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes
    httpMock.verify();
  });

  it('the service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the searchTerm correctly', (done) => {
    service.setSearchTerm('Batman');

    service.searchTerm$.subscribe(term => {
      expect(term).toBe('Batman');
      done();
    });
  });

  it('should make an HTTP request to search movies', () => {
    const mockResponse = { Search: [{ Title: 'Batman Begins' }] };

    service.searchMovies('Batman').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?apikey=${apiKey}&s=Batman`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should obtain a movie by ID', () => {
    const mockResponse = { Title: 'Batman Begins', Year: '2005' };

    service.getMovieById('tt0372784').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?apikey=${apiKey}&i=tt0372784`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
