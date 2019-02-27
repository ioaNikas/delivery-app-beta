import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

// Material
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';



// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';


import { environment } from '../environments/environment';
import { SignupComponent } from './shared/signup/signup.component';
import { LoggerComponent } from './shared/logger/logger.component';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ViewMovieComponent } from './movie/view-movie/view-movie.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SidebarComponent,
    ViewMovieComponent,
    LoggerComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: 'movie/:id', component: ViewMovieComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
    ]),
    environment.production ?
        [] :
        [ AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot() ],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  entryComponents: [SignupComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
