
// tslint:disable-next-line: interface-over-type-literal
export type Material = {
  category: string;
  value: string;
};


export function createMaterial(material: Partial<Material>) {
  return {
    category: material.category,
    value: material.value
  } as Material;
}
