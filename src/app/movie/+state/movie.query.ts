import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { State, MovieStore } from './movie.store';
import { Movie } from './movie.model';
import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import { AuthQuery } from 'src/app/auth/+state/auth.query';





@Injectable({
  providedIn: 'root'
})
export class MovieQuery extends QueryEntity<State, Movie> {

  constructor(protected store: MovieStore, private authQuery: AuthQuery) {
    super(store);
  }

  public moviesOfUser$(): Observable<Movie[]> {
    return combineLatest([
      this.selectAll(),
      this.authQuery.select(state => state.user)
    ]).pipe(
      filter(([movies, user]) => !!user),
      map(([movies, user]) => movies.filter(movie => movie.userId === user.uid))
    );
  }

}
