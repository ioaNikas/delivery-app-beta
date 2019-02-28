import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.css']
})
export class ViewMaterialComponent implements OnInit {

  form: FormGroup;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.form = this.builder.group({
      category: this.builder.group({

      }),
      categories: this.builder.array([
        this.builder.array([
          this.builder.control('')
        ])
      ])
    });
  }

  get categories() {
    return this.form.get('categories') as FormArray;
  }

  addCategory() {
    this.categories.push(this.builder.control(''));
  }

  get materials() {
    return this.form.get('materials') as FormArray;
  }

  addMaterial(i) {
    this.categories[i].push(this.builder.control(''));
  }



  public addTemplate() {
    console.log(this.form.value);
  }


}
