import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { User } from './auth.model';


export interface State extends EntityState<User> {
}



@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'users' })
export class UserStore extends EntityStore<State, User> {
  constructor() {
    super();
  }

}
