import { Injectable } from '@angular/core';
import { TemplateListStore } from './templateList.store';
import { TemplateListQuery } from './templateList.query';
import { createTemplateList } from './templateList.model';






@Injectable({
 providedIn: 'root'
})
export class TemplateListService {

 constructor(private store: TemplateListStore, private query: TemplateListQuery) { }

 public addTemplateList(title: string) {
  const templateList = createTemplateList( { title } );
  this.store.add(templateList);
 }

}
