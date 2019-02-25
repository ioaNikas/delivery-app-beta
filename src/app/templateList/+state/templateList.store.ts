import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TemplateList } from './templateList.model';


export interface State extends EntityState<TemplateList> {
}


@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'templateList' })
export class TemplateListStore extends EntityStore<State, TemplateList> {
  constructor() {
    super();
  }

}
