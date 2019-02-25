import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Movie } from './movie.model';


export interface State extends EntityState<Movie> {
}


@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'movies' })
export class MovieStore extends EntityStore<State, Movie> {
  constructor() {
    super();
  }

}
