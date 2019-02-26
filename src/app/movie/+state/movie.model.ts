// tslint:disable-next-line: interface-over-type-literal
export type Movie = {
  id: string;
  title: string;
  director: string;
  kind: string;
  userId: string
};

export interface MovieForm {
  title: string;
  director: string;
  kind: string;
}

export function createMovie(movie: Partial<Movie>) {
  return {
    id: movie.id,
    title: movie.title,
    director: movie.director,
    kind: movie.kind,
    userId: movie.userId
  } as Movie;
}

export function createMovieForm(movieForm: Partial<MovieForm>) {
  return {
    title: movieForm.title || '',
    director: movieForm.director || '',
    kind: movieForm.kind || ''
  } as MovieForm;
}
