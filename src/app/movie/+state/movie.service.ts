import { Injectable } from '@angular/core';
import { createMovie } from './movie.model';
import { MovieStore } from './movie.store';
import { AuthQuery } from 'src/app/auth/+state/auth.query';






@Injectable({
 providedIn: 'root'
})
export class MovieService {

 constructor(private movieStore: MovieStore, private authQuery: AuthQuery) { }

 public addMovie(title: string, director: string, kind: string) {
  const userId = this.authQuery.idUser;
  const movie = createMovie( { title, director, kind, userId } );
  this.movieStore.add(movie);
 }

}
