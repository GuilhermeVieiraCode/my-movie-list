import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterMoviesComponent } from './register-movies/register-movies.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { FieldsModule } from '../shared/components/fields/fields.module';

@NgModule({
  declarations: [
    RegisterMoviesComponent,
    ListMoviesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsModule
  ]
})
export class MoviesModule { }
