import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { AuthStore } from './auth.store';
import { createUser } from './auth.model';
import { AuthQuery } from './auth.query';

@Injectable({
 providedIn: 'root'
})
export class AuthService {

 constructor(private afAuth: AngularFireAuth, private store: AuthStore, private authQuery: AuthQuery) { }

 public async signup(email: string, password: string, job: string) {
   try {
    const data = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.storeLogedInUser(data, job);
   } catch (err) {
    throw new Error('Something when wrong : ' + err);
   }
 }

 public async signin(email: string, password: string, job: string) {
   try {
    const data = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.storeLogedInUser(data, job);
   } catch (err) {
    throw new Error('Something when wrong : ' + err);
   }
 }

 private storeLogedInUser(creds: any, job: string) {
  if (!creds || !creds.user) { throw new Error('No user found'); }
  const user = createUser( { uid: creds.user.uid, email : creds.user.email, job} );
  this.store.update({user});
 }

 public async changeJob(job: string){
    const userAcutal = this.authQuery.user;
    const user = createUser( { uid: userAcutal.uid, email : userAcutal.email, job} );
    this.store.update({user});
 }

 public disconnect(){
   this.afAuth.auth.signOut()
   .catch(error => console.log(error))
   .then((r) => {
     console.log(r);
     this.store.update({user: { uid: null, email: null, job: null}});
   });
 }
}
