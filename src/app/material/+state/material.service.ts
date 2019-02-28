import { Injectable } from '@angular/core';
import { createMaterial, Material } from './material.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User, AuthQuery } from 'src/app/auth/+state';


@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  public authCollection: AngularFirestoreCollection<User>;

  constructor(private authQuery: AuthQuery, private db: AngularFirestore) {
    this.authCollection = this.db.collection<User>('users');
   }

   public addTemplate(form) {
     const materials = [];
     for (let i = 0; i < form.categories.length; i++) {
        const category = form.categories[i].category;
        for (let j = 0; j < form.categories[i].materials.length; j++) {
          const material: Material = createMaterial( {category, value: form.categories[i].materials[j].value} );
          materials.push(material);
        }
     }

     const currentUser = this.authQuery.getValue().user;
     this.authCollection.doc(currentUser.uid).update({materials});
   }

}
