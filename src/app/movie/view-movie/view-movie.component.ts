import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MovieService } from '../+state/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieQuery } from '../+state/movie.query';
import { Movie } from '../+state/movie.model';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {

  movie$: Observable<Movie>;

  form: FormGroup;


  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private movieQuery: MovieQuery,
    private builder: FormBuilder,
    ) { }

  ngOnInit() {
    this.movie$ = this.route.params.pipe(
      switchMap(params => this.movieQuery.selectEntity(params.id))
    );

    this.form = this.builder.group({
      title: [''],
      director: [''],
      kind: ['']
    });

  }

  addMovie() {
    this.movieService.addMovie(this.form.value.title, this.form.value.director, this.form.value.kind);
  }

  updateMovie(movie) {
    console.log(this.form.value)
    const newMovie = {
      id: movie.id,
      title: this.form.value.title,
      director: this.form.value.director,
      kind: this.form.value.kind,
      userId: movie.userId
    };
    this.movieService.updateMovie(newMovie);
  }

}
