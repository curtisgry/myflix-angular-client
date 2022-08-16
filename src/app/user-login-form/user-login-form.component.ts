import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
/**
 * Render user login and inputs
 */
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

/** 
 * This is the function responsible for sending the form inputs to the backend
 */
logInUser(): void {
    const {Username, Password} = this.userData
    console.log(Username, Password)
    this.userService.authenticateUser(Username, Password).subscribe((result) => {
    // Logic for a successful user Login goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success
    //  Set local storage token and user
     localStorage.setItem('token', result.token)
     localStorage.setItem('user', result.user.Username)
     console.log(result)
     this.snackBar.open(result.user.Username, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  }