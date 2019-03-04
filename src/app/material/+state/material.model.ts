import { ID, guid } from '@datorama/akita';

// tslint:disable-next-line: interface-over-type-literal
export type Material = {
  id: ID;
  category: string;
  value: string;
};


export function createMaterial(material: Partial<Material>) {
  return {
    id: guid(),
    category: material.category,
    value: material.value
  } as Material;
}
