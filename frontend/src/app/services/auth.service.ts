import { Injectable } from '@angular/core';

import { AuthRequest } from 'src/app/interfaces/auth-request.interface';
import { AuthResponse } from 'src/app/interfaces/auth-response.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private apiService: ApiService,
              private dataService: DataService) {

  }

  login(authRequest: AuthRequest) {
    return this.apiService.post<AuthResponse>('authenticate', authRequest);
  }

  logout() {
    // Remove logged in user info from browser storage
    localStorage.removeItem('loggedInUserInfo');
    // Clear data service to avoid information leakage on next login
    this.dataService.clear();
  }
}
