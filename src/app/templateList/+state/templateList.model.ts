import { ID, guid } from '@datorama/akita';

// tslint:disable-next-line: interface-over-type-literal
export type TemplateList = {
  id: ID;
  title: string;
  categories: Category[];
};

// tslint:disable-next-line: interface-over-type-literal
export type Category = {
  name: string;
  items: Item[];
};

// tslint:disable-next-line: interface-over-type-literal
export type Item = {
  name: string;
};

export function createTemplateList(templateList: Partial<TemplateList>) {
  return {
    id: guid(),
    title: templateList.title,
    categories: templateList.categories || []
  } as TemplateList;
}
