import { Injectable } from '@angular/core';
import { createMovie, Movie } from './movie.model';
import { MovieStore } from './movie.store';
import { AuthQuery } from 'src/app/auth/+state/auth.query';
import { MovieQuery } from './movie.query';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public movieCollection: AngularFirestoreCollection<Movie>;
  public collectionName = 'movies';

  constructor(
    private movieStore: MovieStore,
    private authQuery: AuthQuery,
    private db: AngularFirestore,
  ) {
    this.movieCollection = this.db.collection<Movie>(this.collectionName);
    this.subscribeOnUserMovies();
  }

  // tslint:disable-next-line
  public addMovie(_movie: Partial<Movie>) {
    const movie = createMovie( {
      ..._movie,
      id: this.db.createId(),
      userId : this.authQuery.idUser,
    });

    return this.movieCollection.doc(movie.id).set(movie).then(() => {
      //return this.movieCollection.doc(movie.id).collection('templates').add({ "templateId": 1});
    });
  }

  public updateMovie(movie: Movie, form) {
    movie = {...movie, ...form};
    return this.movieCollection.doc(movie.id).set(movie);
  }

  public deleteMovie(movie: Movie) {
    return this.movieCollection.doc(movie.id).delete();
  }

  public subscribeOnUserMovies() {
    this.authQuery.selectUser$.pipe(
      switchMap(({uid}) => this.db
        .collection<Movie>(this.collectionName, ref => ref.where('userId', '==', uid))
        .valueChanges()
      ),
      takeUntil(this.authQuery.isLogout$)
    ).subscribe((movies: Movie[]) => {
      console.log("movie")
      this.movieStore.set(movies);
    });
  }

}
