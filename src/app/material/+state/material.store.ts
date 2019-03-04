import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Material } from './material.model';


export interface State extends EntityState<Material> {
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'materials' })
export class MaterialStore extends EntityStore<State, Material> {
  constructor() {
    super();
  }

}
