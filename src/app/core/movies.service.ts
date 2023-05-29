import { HttpClient, HttpParams } from '@angular/common/http';
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

  list(page: number, quantity: number): Observable<Movie[]>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', page.toString());
    httpParams = httpParams.set('_limit', quantity.toString());
    return this.httpClient.get<Movie[]>(url, {params: httpParams});
  }
}
