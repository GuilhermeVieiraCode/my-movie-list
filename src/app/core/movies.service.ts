import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie';
import { ConfigParams } from '../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/movies/';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient,
              private configParamsService: ConfigParamsService) { }

  save(movie: Movie): Observable<Movie>{
    return this.httpClient.post<Movie>(url, movie);
  }

  list(config: ConfigParams): Observable<Movie[]>{
    let httpParams = this.configParamsService.configParams(config);

    return this.httpClient.get<Movie[]>(url, {params: httpParams});
  }

  view(id: number): Observable<Movie>{
    return this.httpClient.get<Movie>(url + id);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(url + id);
  }

  edit(movie: Movie): Observable<Movie>{
    return this.httpClient.put<Movie>(url + movie.id, movie);
  }
}
