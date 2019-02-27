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

  public user$: Observable<User>;

  constructor(private service: AuthService, private query: AuthQuery, private dialog: MatDialog) {}

  ngOnInit() {
    this.user$ = this.query.select(state => state.user);
  }

  public openLogin() {
    this.dialog.open(SignupComponent);
  }

  public async logout() {
    await this.service.disconnect();
    this.loggedOut.emit();
  }

  public updateUser(job: string) {
    const user = {job};
    this.service.updateUser(user)
    .catch((err) => console.log(err));
  }
}
