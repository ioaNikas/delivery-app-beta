import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { AuthStore } from './auth.store';
import { createUser, User } from './auth.model';
import { AuthQuery } from './auth.query';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class AuthService {

 public authCollection: AngularFirestoreCollection<User>;

 constructor(
   private afAuth: AngularFireAuth,
   private store: AuthStore,
   private db: AngularFirestore,
   private authQuery: AuthQuery) {
  this.authCollection = this.db.collection<User>('users');

  this.subscribeOnUser();

  }

 public async signup(email: string, password: string, job: string) {
   try {
    const data = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    if (!data || !data.user) { throw new Error('No user found'); }
    const user = createUser( {job, uid: data.user.uid} );
    this.authCollection.doc(user.uid).set(user);

   } catch (err) {
    throw new Error('Something when wrong : ' + err);
   }
 }

 public async signin(email: string, password: string, job: string) {
   try {
    const data = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

    if (!data || !data.user) { throw new Error('No user found'); }

   } catch (err) {
    throw new Error('Something when wrong : ' + err);
   }
 }


 public updateUser(user: Partial<User>) {
  const currentUser = this.authQuery.getValue().user;
  return this.authCollection.doc(currentUser.uid).set({...currentUser, ...user});
 }


 public disconnect() {
  this.afAuth.auth.signOut()
  .catch(error => console.log(error))
  .then(() => this.store.update({user: null}));
 }

 private subscribeOnUser() {
    this.afAuth.authState.pipe(
      filter(user => !!user),
      switchMap(({uid}) => this.db.collection<User>('users').doc(uid).valueChanges())
    ).subscribe((user: User) => this.store.update({ user }));
  }
}
