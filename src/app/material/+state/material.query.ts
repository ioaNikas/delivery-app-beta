import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Material } from './material.model';
import { MaterialStore, State } from './material.store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class MaterialQuery extends QueryEntity<State, Material> {

  constructor(protected store: MaterialStore) {
    super(store);
  }


  public template$(): Observable<any> {
    return this.selectAll().pipe(
      map(materials => materials.reduce( (acc, item) => {
        return {
          ...acc,
          [item.category]: [...(acc[item.category] || []), item]
        };

      }, {} )
      )
    );
  }



  // reduce((acc, item) {
  //   const val = {category: 'category' , materials: item['category'] };
  //   groups[val.materials] = groups[val.materials] || [];
  //   groups[val.materials].push(item);
  //   return groups;
  // }, {})));
}
