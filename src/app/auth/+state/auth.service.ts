import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { UserStore } from './auth.store';
import { createUser } from './auth.model';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userStore: UserStore) { }

  public signUp(email: string, password: string){
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string, job: string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => console.log(error))
    .then(data => {
      console.log(data)
      if (data !== undefined){
        const user = createUser( { uid: data.user.uid, email : data.user.email, job} );
        this.userStore.add(user);
      }
    });
  }
}
