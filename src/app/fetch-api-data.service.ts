import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-api-cgray.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Post update to user info
  public updateUserInfo(userName: string, userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http.put<any>(apiUrl + 'users/' + userName, userDetails, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Get all user info including favorites list
  public getUserInfo(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'users/' + userName, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Authenticate new user - returns json with token
  public authenticateUser(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${apiUrl}login?Username=${userName}&Password=${password}`, null)
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Delete user account
  public deleteUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<any>(`${apiUrl}users/${userName}`, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

export class FavoritesService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Favorite list is in user info response
  public getFavoritesList(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'users' + userName, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  //Add favorite to list
  public addUserFavorite(userName: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post<any>(`${apiUrl}users/${userName}/movies/${movieId}`, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  //Delete favorite
  public deleteUserFavorite(userName: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${userName}/movies/${movieId}`, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      catchError(this.handleError)
    )
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

export class MoviesService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Get full list of movies form api
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movies', {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Get single movie by title
  public getOneByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}/movies/${title}`, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Get movies and info for genre
  public getByGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}/movies/genre/${genreName}`, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Get movies by director
  public getByDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}/movies/directors/${director}`, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

export class DirectorService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  
 // Making the api call for the user registration endpoint
  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}/directors/${director}`, {headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
