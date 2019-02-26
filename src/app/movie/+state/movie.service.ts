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
    this.movieCollection = this.db.collection<Movie>('movies')
 }

 public addMovie(title: string, director: string, kind: string) {
  const userId = this.authQuery.idUser;
  const movie = createMovie( { id: this.db.createId(), title, director, kind, userId } );

  this.movieCollection.doc(movie.id).set(movie)
  .catch((err) => {
    throw new Error(`Error while inserting object into firebase collection movies : ${err}`);
  })
  .then(() => {
    this.movieStore.add(movie);
  })
  .catch((err) => {
    throw new Error(`Error while inserting movie into akita state : ${err}`);
  });
 }

 public updateMovie(movie: Movie, form) {
   movie = {...movie, ...form};
   // @todo update firestore
   this.movieStore.update(movie.id, movie);
 }

 public deleteMovie(movie: Movie) {
  // @todo delete firestore
  this.movieStore.remove(movie.id);
 }

}
