import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/core/movies.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.scss']
})
export class ViewMoviesComponent implements OnInit{

  movie!: Movie;
  id!: number;
  readonly noPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png";

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService,
              private router: Router){

  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.view();
  }

  private view(): void{
    this.moviesService.view(this.id).subscribe((movie: Movie) => {
      this.movie = movie;
    })
  }

  edit(): void{
    this.router.navigateByUrl('/movies/register/' + this.id);
  }

  delete(): void {
    const dialogRef = this.dialog.open(AlertComponent , {
      data: {
        title: 'Delete Movie',
        description: 'Are you sure you want to delete the movie?', 
        btnSuccess: 'Delete',
        hasCloseButton: true
      } as Alert
    });
    dialogRef.afterClosed().subscribe((option : boolean) => {
      if(option){
        this.moviesService.delete(this.id).subscribe(() => {
          this.router.navigateByUrl('movies');
        });
      }
    });
  }
}
