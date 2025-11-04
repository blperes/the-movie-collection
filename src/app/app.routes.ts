import { Routes } from '@angular/router';
import { MovieListComponent } from './features/movie-list/movie-list.component';
import {AppComponent} from './app.component';
import {HomepageComponent} from './features/homepage/homepage.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {HeaderComponent} from './layouts/header/header.component';
import {MovieDetailsComponent} from './features/movie-details/movie-details.component';

export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: '', component: HomepageComponent },
    ]
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: 'movie-list', component: MovieListComponent },
      { path: 'movie/:id', component: MovieDetailsComponent}
    ]
  }
];
