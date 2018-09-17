import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from './notification.service';

import { LoginRequest } from 'src/app/interfaces/requests/login-request.interface';
import { MixedResponse } from 'src/app/interfaces/responses/mixed-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private apiService: ApiService,
              private dataService: DataService,
              private notificationService: NotificationService,
              private router: Router) {

  }

  login(userName: string, password: string): void {
    // Create the login request
    const loginRequest: LoginRequest = new LoginRequest(userName, password);
    // Make the API call
    this.apiService.post<MixedResponse>('user/login', loginRequest)
      .subscribe(
        (mixedResponse: MixedResponse) => {
          // Handle the replied result
          this.handleLoginResult(loginRequest, mixedResponse);
        },
        (error: any) => {
          // An error was received
          this.notificationService.showNotification(error);
        }
      );
  }

  logout(): void {
    // Remove logged in user info from browser storage
    localStorage.removeItem('loggedInUserInfo');
    // Clear data service to avoid information leakage on next login
    this.dataService.clear();
    // Redirect to login page
    this.router.navigateByUrl('/login');
  }

  success(id: number, userName: string, password: string): void {
    // Store the user info in the browser
    localStorage.setItem('loggedInUserInfo', JSON.stringify({ id: id,
                                                              userName: userName,
                                                              password: password }));
    // Update the data service
    this.dataService.setId(id);
    this.dataService.setUserName(userName);
    this.dataService.setPassword(password);

    // Navigate to current user space
    this.router.navigateByUrl(`/users/${userName}`);
  }

  private handleLoginResult(loginRequest: LoginRequest, mixedResponse: MixedResponse): void {
    switch (mixedResponse.statusCode) {
      // User authenticated
      case 0: {
        console.log('Authentication successful');
        this.success(mixedResponse.data, loginRequest.userName, loginRequest.password);
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
