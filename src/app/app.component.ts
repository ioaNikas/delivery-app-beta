import { Component, OnInit } from '@angular/core';
import { AuthQuery, User } from './auth/+state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  public job$: Observable<string>;

  constructor(private auth: AuthQuery, private router: Router) {}

  async ngOnInit() {
    this.job$ = this.auth.select(state => state.user.job);
  }

  public logout() {
    this.router.navigate(['']);
  }
}
