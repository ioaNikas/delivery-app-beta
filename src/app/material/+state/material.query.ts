import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Material } from './material.model';
import { MaterialStore, State } from './material.store';
import { reduce } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MaterialQuery extends QueryEntity<State, Material> {

  constructor(protected store: MaterialStore) {
    super(store);
  }

  public template$() {
    return this.selectAll()
    .pipe(
   //   reduce(this.selectAll(), [])
    );
  }

  // var stats = [
  //   { site: "google.fr", browser: "Chrome", value: "50%" },
  //   { site: "google.fr", browser: "FireFox", value: "30%" },
  //   { site: "google.fr", browser: "Internet Explorer", value: "20%" },
  //   { site: "mozilla.fr", browser: "FireFox", value: "60%" },
  //   { site: "mozilla.fr", browser: "Internet Explorer", value: "20%" },
  //   { site: "microsoft.fr", browser: "Chrome", value: "10%" },
  //   { site: "microsoft.fr", browser: "FireFox", value: "20%" },
  // ];
  private compareSite(category, material) {
    return category === material.site;
  }
  private containSite(category, materials) {
    return materials.some(this.compareSite.bind(null, category));
  }
  private groupBySite(memo, material) {
    const category = memo.filter(this.containSite.bind(null, material.category));
    if (category.length > 0) {
      category[0].push(material);
    } else {
      memo.push([material]);
    }
    return memo;
  }
  // Nous utilisons un tableau vide comme accumulateur
  // var results = stats.reduce(groupBySite, []);
}
