import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MaterialService } from '../+state/index';


@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.css']
})
export class ViewMaterialComponent implements OnInit {


  data = {
    categories: [
      {
        category: 'example category',
        materials: [
          {
            value: 'example material',
          }
        ]
      }
    ]
  };

  form: FormGroup;


  constructor(private builder: FormBuilder, private materialService: MaterialService) {}

  ngOnInit() {
    this.form = this.builder.group({
      categories: this.builder.array([])
    });

    this.setCategories();
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

  setCategories() {
    const control = this.form.controls.categories as FormArray;
    this.data.categories.forEach(eachCategory => {
      control.push(this.builder.group({
        category: eachCategory.category,
        materials: this.setMaterials(eachCategory) }));
    });
  }

  setMaterials(control) {
    const arr = new FormArray([]);
    control.materials.forEach(eachMaterial => {
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
