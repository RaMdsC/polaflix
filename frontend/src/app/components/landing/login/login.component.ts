import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormService } from 'src/app/services/form.service';
import { LoginRequest } from 'src/app/interfaces/requests/login-request.interface';
import { StatusResponse } from 'src/app/interfaces/responses/status-response.interface';

@Component({
  selector: 'pol-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hiddenPassword: boolean;
  loginForm: FormGroup;

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
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Call the authentication service for logging in
      const loginRequest: LoginRequest = new LoginRequest(
        this.loginForm.controls.userName.value,
        this.loginForm.controls.password.value);
      this.authService.login(loginRequest)
        .subscribe(
          (statusResponse: StatusResponse) => {
            // Handle the replied result
            this.handleResult(loginRequest, statusResponse);
          },
          (error: any) => {
            // An error was received
            this.notificationService.showNotification(error);
          }
        );
    }
  }

  handleResult(loginRequest: LoginRequest, statusResponse: StatusResponse) {
    switch (statusResponse.statusCode) {
      // User authenticated
      case 0: {
        console.log('Authentication successful');
        // Store the user info in the browser
        localStorage.setItem('loggedInUserInfo', JSON.stringify(loginRequest));
        // Update the data service
        this.dataService.loggedInUser.userName = loginRequest.userName;
        this.dataService.loggedInUser.password = loginRequest.password;
        // Navigate to current user space
        this.router.navigateByUrl(`/users/${loginRequest.userName}`);
        break;
      }
      // Password incorrect
      case 1: {
        console.error('Incorrect password');
        this.notificationService.showNotification('Incorrect password');
        break;
      }
      // Unknown username
      case 2: {
        console.error('User name does not exist');
        this.notificationService.showNotification('User name does not exist');
        break;
      }
    }
  }
}
