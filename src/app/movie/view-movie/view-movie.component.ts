import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MovieService } from '../+state/movie.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl(),
    director: new FormControl(),
    kind: new FormControl()
  });

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  addMovie() {
    this.movieService.addMovie(this.form.value.title, this.form.value.director, this.form.value.kind);
  }

}
