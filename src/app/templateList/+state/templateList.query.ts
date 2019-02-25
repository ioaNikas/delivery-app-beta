import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TemplateList } from './templateList.model';
import { State, TemplateListStore } from './templateList.store';



@Injectable({
  providedIn: 'root'
})
export class TemplateListQuery extends QueryEntity<State, TemplateList> {

  constructor(protected store: TemplateListStore, private query: TemplateListQuery) {
    super(store);
  }

}
