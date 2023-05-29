import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MoviesService } from 'src/app/core/movies.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit{
  movies: Movie[] = [];
  config: ConfigParams = {
    page: 0,
    limit: 4
  }
  
  filtersList!: FormGroup;
  genres!: string[];
  readonly noPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png";

  constructor(private moviesService: MoviesService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filtersList = this.formBuilder.group({
      text: [''],
      genre: ['']
    });

    this.filtersList.get('text')?.valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.search = val;
      this.resetList();
    });

    this.filtersList.get('genre')?.valueChanges.subscribe((val: string) => {
      this.config.field = {type: 'genre', value: val};
      this.resetList();
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

    this.resetList();
  }

  onScroll(): void {
    this.listMovies();
  }

  private listMovies(): void{
    this.config.page++;
    this.moviesService.list(this.config).subscribe((movies: Movie[]) => {
      this.movies.push(...movies);
    });
  }

  private resetList(): void{
    this.config.page = 0;
    this.movies = [];
    this.listMovies();
  }

}
