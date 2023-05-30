import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesModule } from './movies/movies.module';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { RegisterMoviesComponent } from './movies/register-movies/register-movies.component';
import { ViewMoviesComponent } from './movies/view-movies/view-movies.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'movies',
      pathMatch: 'full'
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        component: ListMoviesComponent
      },
      {
        path: 'register',
        component: RegisterMoviesComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: ViewMoviesComponent,
      },
    ]
  },
  { path: '**', redirectTo: 'movies' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MoviesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
