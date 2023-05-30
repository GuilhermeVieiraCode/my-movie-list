import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  id!: number;

  constructor(public dialog: MatDialog,
              public validateFields: ValidateFieldsService,
              private formBuilder: FormBuilder, 
              private moviesService: MoviesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f(){
    return this.register.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id){
      this.moviesService.view(this.id).subscribe((movie: Movie) => {
        this.createForm(movie);
      })
    }else{
      this.createForm(this.createBlankMovie());
    }

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
    if(this.id){
      movie.id = this.id;
      this.edit(movie);
    }else{
      this.save(movie);
    }
  }

  private createForm(movie: Movie): void{
    this.register = this.formBuilder.group({
      title: [movie.title, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      pictureUrl: [movie.pictureUrl, [Validators.minLength(10)]],
      releaseDate: [movie.releaseDate, [Validators.required]],
      description: [movie.description],
      rating: [movie.rating, [Validators.required, Validators.min(0), Validators.max(10)]],
      imdbUrl: [movie.imdbUrl, [Validators.minLength(10)]],
      genre: [movie.genre, [Validators.required]]
    });
  }

  private createBlankMovie(): Movie{
    return {
      id: null,
      title: null,
      pictureUrl: null,
      releaseDate: null,
      description: null,
      rating: null,
      imdbUrl: null,
      genre: null
    } as unknown as Movie
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
            description: 'A error ocurred while edit the movie, try again later',
            colorBtnSuccess: 'warn',
            btnSuccess: 'Close'
          } as Alert
        });
      }
    })
  }

  private edit(movie: Movie): void{
    this.moviesService.edit(movie).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(AlertComponent , {
          data: {
            description: 'Movie updated with success',
            btnSuccess: 'Go To Movie List',
          } as Alert
        });
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('movies');
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
