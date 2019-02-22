import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { User } from './auth.model';

type Jobs = 'distributor' | 'producer' | 'laboratory';

export interface State {
  form: {
    email: string;
    password: string;
    job: Jobs;
  };
  user: User;
}

const initialState = {
  form: {},
  user: null,
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'user' })
export class AuthStore extends Store<State> {
  constructor() {
    super(initialState);
  }

}
