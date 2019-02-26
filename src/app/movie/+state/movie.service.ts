import { Injectable } from '@angular/core';
import { createMovie, Movie } from './movie.model';
import { MovieStore } from './movie.store';
import { AuthQuery } from 'src/app/auth/+state/auth.query';
import { filter, map } from 'rxjs/operators';
import { MovieQuery } from './movie.query';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class MovieService {
    public movieCollection: AngularFirestoreCollection<Movie>;
    public movies: Observable<Movie[]>;

 constructor(
     private movieStore: MovieStore,
     private movieQuery: MovieQuery,
     private authQuery: AuthQuery,
     private db: AngularFirestore,
 ) {
    this.movieCollection = this.db.collection<Movie>('movies');
    this.getMovies();
 }

 public addMovie(_movie: Partial<Movie>) {
  const movie = createMovie( {
    ..._movie,
    id: this.db.createId(),
    userId : this.authQuery.idUser,
  });

  return this.movieCollection.doc(movie.id).set(movie);
 }

 public updateMovie(movie: Movie, form) {
  movie = {...movie, ...form};
  return this.movieCollection.doc(movie.id).set(movie);
 }

 public deleteMovie(movie: Movie) {
  return this.movieCollection.doc(movie.id).delete();
 }

 public getMovies() {
  this.movieCollection.valueChanges().subscribe((movies: Movie[]) => {
      this.movieStore.set(movies);
  });
 }

}
