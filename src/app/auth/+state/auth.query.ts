import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { State, AuthStore } from './auth.store';
import { User } from './auth.model';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthQuery extends Query<State> {

  constructor(protected store: AuthStore) {
    super(store);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.select(state => state.user).pipe(
      map(user => !!user),
      distinctUntilChanged()
    );
  }

  get idUser(): string {
    return this.getValue().user.uid;
  }

  get user(): User {
    return this.getValue().user;
  }

  selectUser$ = this.select(state => state.user).pipe(filter(user => !!user));

  isLogout$ = this.select(state => state.user).pipe(filter(user => !user));

}
