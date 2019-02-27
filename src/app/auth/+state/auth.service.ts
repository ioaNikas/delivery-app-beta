import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { AuthStore } from './auth.store';
import { createUser, User } from './auth.model';
import { AuthQuery } from './auth.query';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/movie/+state';
import { map } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class AuthService {

 public authCollection: AngularFirestoreCollection<User>;
 public user: Observable<User>;

 constructor(
   private afAuth: AngularFireAuth,
   private store: AuthStore,
   private db: AngularFirestore,
   private movieService: MovieService,
   private authQuery: AuthQuery) {
  this.authCollection = this.db.collection<User>('users');
  }

 public async signup(email: string, password: string, job: string) {
   try {
    const data = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    if (!data || !data.user) { throw new Error('No user found'); }
    const user = createUser( { uid: data.user.uid, email : data.user.email, job} );
    this.authCollection.doc(user.uid).set(user);
    this.store.update({user});
    this.movieService.subscribeOnUserMovies(user.uid);
    this.subscribeOnUser(user);

   } catch (err) {
    throw new Error('Something when wrong : ' + err);
   }
 }

 public async signin(email: string, password: string, job: string) {
   try {
    const data = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

    if (!data || !data.user) { throw new Error('No user found'); }
    const user = createUser( { uid: data.user.uid, email : data.user.email, job} );
    this.store.update({user});
    this.movieService.subscribeOnUserMovies(user.uid);
    this.subscribeOnUser(user);

   } catch (err) {
    throw new Error('Something when wrong : ' + err);
   }
 }


 public updateUser(user: Partial<User>) {
  const userActual = {...this.authQuery.getValue().user, ...user };
  return this.authCollection.doc(userActual.uid).set(userActual);
 }


 public disconnect() {
   this.afAuth.auth.signOut()
   .catch(error => console.log(error))
   .then((r) => {
     console.log(r);
     this.store.update({user: null});
   });
 }

 private subscribeOnUser(userActual: User) {
    this.db.collection<User>('users', ref => ref.where('uid', '==', userActual.uid))
    .valueChanges()
    .subscribe((users: User[]) => { users.map(user => this.store.update({user}));

    });
  }

}
