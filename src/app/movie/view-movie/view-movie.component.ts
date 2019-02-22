import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MovieService } from '../+state/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieQuery } from '../+state/movie.query';
import { Movie } from '../+state/movie.model';
import { takeWhile, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit{

  movie$: Observable<Movie>;
  isAdd=true;

  form = new FormGroup({
    title: new FormControl(),
    director: new FormControl(),
    kind: new FormControl()
  });

  constructor(private movieService: MovieService, private route: ActivatedRoute, private movieQuery: MovieQuery) { }

  ngOnInit() {
    this.movie$ = this.route.params.pipe(
      switchMap(params =>  this.movieQuery.selectEntity(params.id))
    );
  }


  changeIsAdd() {
    this.isAdd = false;
  }


  addMovie() {
    this.movieService.addMovie(this.form.value.title, this.form.value.director, this.form.value.kind);
  }

}
