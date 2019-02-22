import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/movie/+state/movie.model';
import { MovieQuery } from 'src/app/movie/+state/movie.query';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  movies$: Observable<Movie[]>;

  constructor(private movieQuery: MovieQuery) { }

  ngOnInit() {
    this.movies$ = this.movieQuery.moviesOfUser$();
  }
}
