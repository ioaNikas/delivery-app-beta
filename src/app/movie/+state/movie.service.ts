import { Injectable } from '@angular/core';
import { createMovie, Movie } from './movie.model';
import { MovieStore } from './movie.store';
import { AuthQuery } from 'src/app/auth/+state/auth.query';
import { filter, map } from 'rxjs/operators';
import { MovieQuery } from './movie.query';






@Injectable({
 providedIn: 'root'
})
export class MovieService {

 constructor(private movieStore: MovieStore, private movieQuery: MovieQuery, private authQuery: AuthQuery) { }

 public addMovie(title: string, director: string, kind: string) {
  const userId = this.authQuery.idUser;
  const movie = createMovie( { title, director, kind, userId } );
  this.movieStore.add(movie);
 }

 public updateMovie(movie: Movie, form) {
   movie = {...movie, ...form};
   this.movieStore.update(movie.id, movie);
 }

 public deleteMovie(movie: Movie) {
  this.movieStore.remove(movie.id);
 }

}
