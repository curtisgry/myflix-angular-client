import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

user = localStorage.getItem('user') || '';
userData = {Username: '', Email: '', Password: '', Birthday: ''}
constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.getInfo();
}

// This is the function responsible for sending the form inputs to the backend
getInfo(): void {
  if(!this.user) return;
    this.userService.getUserInfo(this.user).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     console.log(result)
     this.userData = {
      Username: result.Username,
      Email: result.Email,
      Birthday: result.Birthday,
      Password: '',
     }
    });
  }

  updateUser(): void {
    this.userService.updateUserInfo(this.user, this.userData).subscribe((result) => {
      this.snackBar.open('Profile Updated', 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  }