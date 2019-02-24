import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AuthQuery, User, AuthService } from '../../auth/+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggerComponent implements OnInit {

  @Output() loggedOut = new EventEmitter();

  public job$: Observable<string>;

  constructor(private service: AuthService, private query: AuthQuery, private dialog: MatDialog) {}

  ngOnInit() {
    this.job$ = this.query.job$;
  }

  public openLogin() {
    this.dialog.open(SignupComponent);
  }

  public async logout() {
    await this.service.disconnect();
    this.loggedOut.emit();
  }

  public changeJob(job: string) {
    this.service.changeJob(job);
  }
}
