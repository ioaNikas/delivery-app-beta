import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { State, MovieStore } from './movie.store';
import { Movie } from './movie.model';





@Injectable({
  providedIn: 'root'
})
export class MovieQuery extends QueryEntity<State, Movie> {

  constructor(protected store: MovieStore) {
    super(store);
  }
}
