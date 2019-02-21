import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { State, UserStore } from './auth.store';
import { User } from './auth.model';





@Injectable({
  providedIn: 'root'
})
export class UserQuery extends QueryEntity<State, User> {

  constructor(protected store: UserStore) {
    super(store);
  }
}
