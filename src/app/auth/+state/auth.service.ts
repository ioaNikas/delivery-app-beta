import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { AuthStore } from './auth.store';
import { createUser, User, UserDB, createUserDB } from './auth.model';
import { AuthQuery } from './auth.query';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';


@Injectable({
 providedIn: 'root'
})
export class AuthService {

 public authCollection: AngularFirestoreCollection<UserDB>;

 constructor(
   private afAuth: AngularFireAuth,
   private store: AuthStore,
   private db: AngularFirestore,
   private authQuery: AuthQuery) {
  this.authCollection = this.db.collection<UserDB>('users');

  this.subscribeOnUser();

  }

 public async signup(email: string, password: string, job: string) {
   try {
    const data = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    if (!data || !data.user) { throw new Error('No user found'); }
    const user = createUserDB( {job} );
    this.authCollection.doc(data.user.uid).set(user);

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
  return this.authCollection.doc(this.authQuery.getValue().user.uid).set(user);
 }


 public disconnect() {
   this.afAuth.auth.signOut()
   .catch(error => console.log(error))
   .then((r) => {
     console.log(r);
     this.store.update({user: null});
   });

 }

 private subscribeOnUser() {

    this.afAuth.user.subscribe((auth) => {
      if (auth) {
        this.db.collection<UserDB>('users').doc(auth.uid)
        .valueChanges()
        .subscribe((user: UserDB) => { console.log("hello"); this.store.update( { user: createUser({...auth, ...user}) } ); });
      }
    });
  }

}
