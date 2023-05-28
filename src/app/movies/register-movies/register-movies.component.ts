import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MoviesService } from 'src/app/core/movies.service';
import { ValidateFieldsService } from 'src/app/shared/components/fields/validate-fields.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-register-movies',
  templateUrl: './register-movies.component.html',
  styleUrls: ['./register-movies.component.scss']
})
export class RegisterMoviesComponent implements OnInit{
  register!: FormGroup;
  genres!: Array<string>;

  constructor(private formBuilder: FormBuilder, 
              public validateFields: ValidateFieldsService,
              private moviesService: MoviesService) { }

  get f(){
    return this.register.controls;
  }

  ngOnInit() {
    this.register = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      pictureUrl: ['', [Validators.minLength(10)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      imdbUrl: ['', [Validators.minLength(10)]],
      genre: ['', [Validators.required]]
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
  }

  submit(): void{
    this.register.markAllAsTouched;
    if(this.register.invalid){
      return;
    }

    const movie = this.register.getRawValue() as Movie;
    this.save(movie);
    this.resetForm();
  }

  resetForm(): void{
    this.register.reset;
  }

  private save(movie: Movie): void{
    this.moviesService.save(movie).subscribe({
      next: () => console.log('Saved with success'),
      error: () => console.log('Error')
    })
  }
}
