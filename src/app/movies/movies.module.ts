import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RegisterMoviesComponent } from './register-movies/register-movies.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { MaterialModule } from '../shared/material/material.module';
import { FieldsModule } from '../shared/components/fields/fields.module';
import { ViewMoviesComponent } from './view-movies/view-movies.component';

@NgModule({
  declarations: [
    RegisterMoviesComponent,
    ListMoviesComponent,
    ViewMoviesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsModule,
    InfiniteScrollModule
  ]
})
export class MoviesModule { }
