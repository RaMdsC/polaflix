import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

import { LoginRequest } from 'src/app/interfaces/requests/login-request.interface';
import { StatusResponse } from 'src/app/interfaces/responses/status-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private apiService: ApiService,
              private dataService: DataService,
              private router: Router) {

  }

  login(loginRequest: LoginRequest) {
    return this.apiService.post<StatusResponse>('user/login', loginRequest);
  }

  logout() {
    // Remove logged in user info from browser storage
    localStorage.removeItem('loggedInUserInfo');
    // Clear data service to avoid information leakage on next login
    this.dataService.clear();
    // Redirect to login page
    this.router.navigateByUrl('/login');
  }
}
