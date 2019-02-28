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
     for (const formCategory of form.categories) {
        const category = formCategory.category;
        for (const formMaterial of formCategory.materials) {
          const material: Material = createMaterial( {category, value: formMaterial.value} );
          materials.push(material);
        }
     }

     const currentUser = this.authQuery.getValue().user;
     this.authCollection.doc(currentUser.uid).update({materials});
   }

}
