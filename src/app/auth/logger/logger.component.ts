import { Component, OnInit } from '@angular/core';
import { AuthService } from '../+state/auth.service';

@Component({
  selector: 'auth-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
   // @todo recuperer user dans state
  }

  public logOut() {
    this.authService.disconnect();
  }
}
