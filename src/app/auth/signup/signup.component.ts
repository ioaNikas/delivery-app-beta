import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../+state/auth.service';
import { Observable } from 'rxjs';
import { User } from '../+state/auth.model';
import { UserQuery } from '../+state/auth.query';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    job: new FormControl()
  });

  users: Observable<User[]>;



  constructor(private authService: AuthService, private userQuery: UserQuery) { }

  ngOnInit() {
  }

  signUp(){
    this.authService.signUp(this.form.value.email, this.form.value.password, this.form.value.job);
  }

  logIn(){
    this.authService.logIn(this.form.value.email, this.form.value.password, this.form.value.job);
  }
}
