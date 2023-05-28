import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/core/movies.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidateFieldsService } from 'src/app/shared/components/fields/validate-fields.service';
import { Alert } from 'src/app/shared/models/alert';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-register-movies',
  templateUrl: './register-movies.component.html',
  styleUrls: ['./register-movies.component.scss']
})
export class RegisterMoviesComponent implements OnInit{
  register!: FormGroup;
  genres!: Array<string>;

  constructor(public dialog: MatDialog,
              public validateFields: ValidateFieldsService,
              private formBuilder: FormBuilder, 
              private moviesService: MoviesService,
              private router: Router) { }

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
    this.register.markAllAsTouched();
    if(this.register.invalid){
      return;
    }

    const movie = this.register.getRawValue() as Movie;
    this.save(movie);
  }

  resetForm(): void{
    this.register.reset();
  }

  private save(movie: Movie): void{
    this.moviesService.save(movie).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(AlertComponent , {
          data: {
            btnSuccess: 'Go To Movie List',
            btnCancel: 'Register New Movie',
            colorBtnCancel: 'primary',
            hasCloseButton: true
          } as Alert
        });
        dialogRef.afterClosed().subscribe((option : boolean) => {
          option ? this.router.navigateByUrl('movies') : this.resetForm();
        });
      },
      error: () => {
        const dialogRef = this.dialog.open(AlertComponent , {
          data: {
            title: 'Error',
            description: 'A error ocurred while saving the movie, try again later',
            colorBtnSuccess: 'warn',
            btnSuccess: 'Close'
          } as Alert
        });
      }
    })
  }
}
