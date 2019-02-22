import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { State, MovieStore } from './movie.store';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import { AuthQuery } from 'src/app/auth/+state/auth.query';





@Injectable({
  providedIn: 'root'
})
export class MovieQuery extends QueryEntity<State, Movie> {

  constructor(protected store: MovieStore, private authquery: AuthQuery) {
    super(store);
  }

  public moviesOfUser$(): Observable<Movie[]> {
    const idUser = this.authquery.idUser;
    return this.selectAll().pipe(map(movies => movies.filter(movie => movie.userId === idUser)));
  }

}
