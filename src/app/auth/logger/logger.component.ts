import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../+state/auth.service';
import { AuthQuery } from '../+state/auth.query';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, public authQuery: AuthQuery) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authQuery.isLoggedIn$;
  }


  public logOut() {
    this.authService.disconnect();
  }
}
