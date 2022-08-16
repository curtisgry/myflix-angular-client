import { Component } from '@angular/core';
import { FavoritesService, MoviesService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DisplayInfoComponent } from '../display-info/display-info.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
/**
 * Display info and inputs for each movie in the movies list
 * from the api in a card
 */
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public movieService: MoviesService,
    public favoriteService: FavoritesService,
    public dialog: MatDialog,
    ) { }

openDialog(movieId : string, from : string): void {

  const {Title, Description, Genre, Director} = this.movies.filter(movie => movie._id === movieId)[0];

  if(!Title) return;
  this.dialog.open(DisplayInfoComponent, {
    data: { 
      from,
      Title,
      Description,
      DirectorName: Director.Name,
      DirectorBio: Director.Bio,
      GenreName: Genre.Name,
      GenreDescription: Genre.Description
    }
  })

}

ngOnInit(): void {
  this.getMovies();
  this.refreshFavorites();
}

getMovies(): void {
  this.movieService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Refresh list to show updated favorite status on movie card
   */
refreshFavorites(): void {
  const user = localStorage.getItem('user') || '';
  const token = localStorage.getItem('token')
    this.favoriteService.getFavoritesList(user).subscribe((result) => {
      this.favorites = result.FavoriteMovies
    })
}
/**
 * Add a movie to the users favorite list
 * @param movieId 
 */
setFavorite(movieId: string): void {
  const user = localStorage.getItem('user') || '';
  const token = localStorage.getItem('token')
  this.favoriteService.addUserFavorite(user, movieId).subscribe((result) => {
    this.refreshFavorites();
  })
}
/**
 * Delete favorite from user in api
 * @param movieId 
 */

deleteFavorite(movieId: string): void {
  const user = localStorage.getItem('user') || '';
  const token = localStorage.getItem('token')
  this.favoriteService.deleteUserFavorite(user, movieId).subscribe((result) => {
    this.refreshFavorites();
  })
}
/**
 * Check if the movie exists in the current users favorite list
 * @param movieId 
 * @returns boolean
 */
checkIsFavorite(movieId: string) {
  const list = this.favorites.filter(fav => fav  === movieId);
  if(list.length){
    return true;
  } else {
    return false
  }
}
}
