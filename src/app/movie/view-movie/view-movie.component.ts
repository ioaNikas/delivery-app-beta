import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MovieService } from '../+state/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieQuery } from '../+state/movie.query';
import { Movie } from '../+state/movie.model';
import { switchMap } from 'rxjs/operators';
import { PersistNgFormPlugin } from '@datorama/akita';
import { State, MovieStore } from '../+state';


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
    private movieStore: MovieStore
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

    this.movie$.subscribe(value => value ? this.form.patchValue(value) : this.form.reset());
  }

  addMovie() {
    this.movieService
    .addMovie(this.form.value)
    .then(() => this.form.reset())
    .catch((err) => console.log(err));
  }

  updateMovie(movie) {
    this.movieService.updateMovie(movie, this.form.value)
    .catch((err) => console.log(err));
  }

  deleteMovie(movie) {
    this.movieService.deleteMovie(movie)
    .catch((err) => console.log(err));
  }

}
