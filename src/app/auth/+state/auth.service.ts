import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { UserStore } from './auth.store';
import { createUser } from './auth.model';





@Injectable({
 providedIn: 'root'
})
export class AuthService {

 constructor(private afAuth: AngularFireAuth, private userStore: UserStore) { }

 public signUp(email: string, password: string, job: string){
   this.afAuth.auth.createUserWithEmailAndPassword(email, password)
   .catch(error => console.log(error))
   .then(data => this.storeLogedInUser(data, job));
 }

 public logIn(email: string, password: string, job: string){
   this.afAuth.auth.signInWithEmailAndPassword(email, password)
   .catch(error => console.log(error))
   .then(data => this.storeLogedInUser(data, job));
 }

 private storeLogedInUser(creds: any, job: string) {
   if (creds && creds.user){
     const user = createUser( { uid: creds.user.uid, email : creds.user.email, job} );
     this.userStore.add(user);
     return true;
   }

   return false;
 }

 public disconnect(){
   this.afAuth.auth.signOut()
   .catch(error => console.log(error))
   .then((r) => {
     console.log(r);
     this.userStore.remove();
   });
 }
}
