import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie';

const url = 'http://localhost:3000/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  save(movie: Movie): Observable<Movie>{
    return this.httpClient.post<Movie>(url, movie);
  }

  list(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(url);
  }
}
