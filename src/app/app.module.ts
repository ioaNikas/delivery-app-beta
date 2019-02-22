import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';



// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';


import { environment } from '../environments/environment';
import { SignupComponent } from './auth/signup/signup.component';
import { LoggerComponent } from './auth/logger/logger.component';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ViewMovieComponent } from './movie/view-movie/view-movie.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SidebarComponent,
    ViewMovieComponent,
    LoggerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: 'movie/:id', component: ViewMovieComponent },
      { path: '', pathMatch: 'full', redirectTo: 'movie/add' },
    ]),
    environment.production ?
        [] :
        [ AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot() ],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
