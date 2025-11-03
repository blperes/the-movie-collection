import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = '56799494';
  private apiUrl = 'http://www.omdbapi.com/';

  private searchTerm= new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable();

  constructor(private http: HttpClient) { }

  setSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  searchMovies(title: string): Observable<any> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&s=${title}`;
    return this.http.get(url);
  }

}
