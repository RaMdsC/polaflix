import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormService } from 'src/app/services/form.service';
import { AuthRequest } from 'src/app/interfaces/auth-request.interface';
import { AuthResponse } from 'src/app/interfaces/auth-response.interface';

@Component({
  selector: 'pol-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hiddenPassword: boolean;
  loginForm: FormGroup;
  formSubmitAttempt: boolean;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private notificationService: NotificationService,
              public formService: FormService,
              private router: Router) {

  }

  ngOnInit() {
    // Set password field as hidden
    this.hiddenPassword = true;

    // Set the form controls
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    // Set the submit attempt to false
    this.formSubmitAttempt = false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Call the authentication service for logging in
      const authRequest = new AuthRequest(this.loginForm.controls.userName.value,
                                          this.loginForm.controls.password.value);
      this.authService.login(authRequest)
        .subscribe(
          (authResponse: AuthResponse) => {
            // Handle the replied result
            this.handleResult(authRequest, authResponse);
          },
          (error: any) => {
            // An error was received
            this.notificationService.showNotification(error);
          }
        );
    } else {
      this.formSubmitAttempt = true;
    }
  }

  handleResult(authRequest: AuthRequest, authResponse: AuthResponse) {
    switch (authResponse.status) {
      // User authenticated
      case 0: {
        console.log(authResponse.message);
        // Store the user info in the browser
        localStorage.setItem('loggedInUserInfo', JSON.stringify(authRequest));
        // Update the data service
        this.dataService.loggedInUser.userName = authRequest.userName;
        this.dataService.loggedInUser.password = authRequest.password;
        // Navigate to current user space
        this.router.navigateByUrl(`/users/${authRequest.userName}`);
        break;
      }
      // Password incorrect
      case 1: {
        console.error(authResponse.message);
        this.notificationService.showNotification(authResponse.message);
        break;
      }
      // Unknown username
      case 2: {
        console.error(authResponse.message);
        this.notificationService.showNotification(authResponse.message);
        break;
      }
    }
  }
}
