import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  filtersList!: FormGroup;
  genres!: string[];


  constructor(private moviesService: MoviesService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filtersList = this.formBuilder.group({
      text: [''],
      genre: ['']
    });

    this.genres = [
    'Action', 
    'Adventure', 
    'Comedy', 
    'Drama', 
    'Fantasy', 
    'Horror', 
    'Romance', 
    'Science Fiction', 
    'Thriller', 
    'Western'];

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
