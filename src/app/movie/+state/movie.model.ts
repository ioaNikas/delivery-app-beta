import { ID, guid } from '@datorama/akita';

// tslint:disable-next-line: interface-over-type-literal
export type Movie = {
  id: ID;
  title: string;
  director: string;
  kind: string;
  userId: string
};

export function createMovie(movie: Partial<Movie>) {
  return {
    id: guid(),
    title: movie.title,
    director: movie.director,
    kind: movie.kind,
    userId: movie.userId
  } as Movie;
}
