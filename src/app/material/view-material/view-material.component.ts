import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MaterialService, Material, MaterialQuery } from '../+state/index';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.css']
})
export class ViewMaterialComponent implements OnInit {

  // data = {
  //   categories: [
  //     {
  //       category: 'example category',
  //       materials: [
  //         {
  //           value: 'example material',
  //         }
  //       ]
  //     },
  //     {
  //       category: 'example category',
  //       materials: [
  //         {
  //           value: 'example material',
  //         }
  //       ]
  //     }
  //   ]
  // };

  data = {
    'example category': [
      {
        category: 'example category',
        id: "a9d36947be",
        value: "example material"
      }
    ],
    "ok": [
      {
        category: "ok",
        id: "eae92a42bb",
        value: "ok"
      }
    ]
  };


  template$: Observable<any>;

  form: FormGroup;


  constructor(private builder: FormBuilder, private materialService: MaterialService, private materialQuery: MaterialQuery) {}

  ngOnInit() {
    this.form = this.builder.group({
      categories: this.builder.array([])
    });

    this.template$ = this.materialQuery.template$();
    this.template$.subscribe(data => this.setCategories(data));

  }

  get categories() {
    return this.form.get('categories') as FormArray;
  }

  addNewCategory() {
    const control = this.form.controls.categories as FormArray;
    control.push(
      this.builder.group({
        category: [''],
        materials: this.builder.array([])
      })
    );
  }

  deleteCategory(index) {
    const control = this.form.controls.categories as FormArray;
    control.removeAt(index);
  }

  addNewMaterial(control) {
    control.push(
      this.builder.group({
        value: [''],
      }));
  }

  deleteMaterial(control, index) {
    control.removeAt(index);
  }

  setCategories(data) {
    const control = this.form.controls.categories as FormArray;
    // this.data.categories.forEach(eachCategory => {
    //   control.push(this.builder.group({
    //     category: eachCategory.category,
    //     materials: this.setMaterials(eachCategory) }));
    // });
    const object = data;
    console.log(this.data)
    Object.keys(object).forEach( (key) => {
         console.log(object[key]);
         control.push(this.builder.group({
         category: key,
         materials: this.setMaterials(object[key]) }));
   });
  }

  setMaterials(control) {
    const arr = new FormArray([]);
    control.forEach(eachMaterial => {
      arr.push(this.builder.group({
        value: eachMaterial.value
      }));
    });
    return arr;
  }

  submitTemplate() {
    console.log(this.form.value);
    this.materialService.addTemplate(this.form.value);
  }

}
