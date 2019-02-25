import { Component, OnInit } from '@angular/core';
import { User, AuthQuery } from '../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user$: Observable<User>;

  constructor(private authQuery: AuthQuery) { }

  ngOnInit() {
    this.user$ = this.authQuery.select(state => state.user);
  }

}
