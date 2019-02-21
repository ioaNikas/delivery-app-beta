import { Injectable } from '@angular/core';
import { createMovie } from './movie.model';
import { MovieStore } from './movie.store';






@Injectable({
 providedIn: 'root'
})
export class MovieService {

 constructor(private movieStore: MovieStore) { }

 public addMovie(title: string, director: string, kind: string){
  const movie = createMovie( { title, director, kind} );
  this.movieStore.add(movie);
 }

}
