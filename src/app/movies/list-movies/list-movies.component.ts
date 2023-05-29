import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/movies.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit{
  movies: Movie[] = [];
  pageNumber = 0;
  readonly quantityPerPage = 4;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.listMovies();
  }

  onScroll(): void {
    this.listMovies();
  }

  private listMovies(): void{
    this.pageNumber++;
    this.moviesService.list(this.pageNumber, this.quantityPerPage).subscribe((movies: Movie[]) => {
      this.movies.push(...movies);
    });
  }

}
