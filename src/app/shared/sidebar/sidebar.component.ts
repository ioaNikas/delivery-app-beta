import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/movie/+state/movie.model';
import { MovieQuery } from 'src/app/movie/+state/movie.query';
import { User, AuthQuery } from 'src/app/auth/+state';
import { TemplateList, TemplateListQuery } from 'src/app/templateList/+state';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user$: Observable<User>;
  movies$: Observable<Movie[]>;
  templateList$: Observable<TemplateList[]>;

  constructor(private movieQuery: MovieQuery, private authQuery: AuthQuery, private templateListQuery: TemplateListQuery) { }

  ngOnInit() {
    this.movies$ = this.movieQuery.moviesOfUser$();
    this.user$ = this.authQuery.select(state => state.user);
    this.templateList$ = this.templateListQuery.selectAll();
  }
}
