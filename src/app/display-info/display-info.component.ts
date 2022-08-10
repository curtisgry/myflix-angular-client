import { Component, Inject, OnInit } from '@angular/core';
import { MoviesService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-display-indo',
  template: 'passed in {{data.movie}}',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.scss']
})
export class DisplayInfoComponent {
  movies: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      from: string, 
      Title: string, 
      Description: string,
      DirectorName: string,
      DirectorBio: string,
      GenreName: string,
      GenreDescription: string,
    },
    public movieService: MoviesService,
    public dialogRef: MatDialogRef<DisplayInfoComponent>,
    ) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.movieService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }


getDirectorInfo(movieId: string): void {
  
}
}
