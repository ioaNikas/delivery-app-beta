import { Component, OnInit } from '@angular/core';
import { TemplateList, TemplateListService, TemplateListQuery } from '../+state';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {

  templateList$: Observable<TemplateList>;

  form: FormGroup;

  constructor(
    private templateListService: TemplateListService,
    private route: ActivatedRoute,
    private templateListQuery: TemplateListQuery,
    private builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.templateList$ = this.route.params.pipe(
      switchMap(params => this.templateListQuery.selectEntity(params.id))
    );

    this.form = this.builder.group({
      title: ['', Validators.required],
    });
  }

  addTemplateList() {
    this.templateListService.addTemplateList(this.form.value.title);
  }

}
