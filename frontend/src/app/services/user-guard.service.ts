import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataService } from 'src/app/services/data.service';

@Injectable({ providedIn: 'root' })
export class UserGuardService implements CanActivate {

  constructor(private router: Router,
              private dataService: DataService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Get currently logged in user from local storage
    const loggedInUserInfo = JSON.parse(localStorage.getItem('loggedInUserInfo'));

    if (!loggedInUserInfo) {
      // Redirect to login if there is no user
      this.router.navigateByUrl('/login');
      return false;
    } else {
      // Load userName and password into data service
      this.dataService.loggedInUser.userName = loggedInUserInfo['userName'];
      this.dataService.loggedInUser.password = loggedInUserInfo['password'];
      if (state.url === '/users' || this.otherUser(loggedInUserInfo['userName'], state.url)) {
        // Redirect to its user space if the requested URL is intermediate
        // or if it is based on another user's domain
        this.router.navigateByUrl(`/users/${loggedInUserInfo['userName']}`);
        return false;
      } else {
        // Allow access otherwise
        return true;
      }
    }
  }

  private otherUser(userName: string, url: string): boolean {
    const sameUserRe = new RegExp('^\/users\/' + userName + '.*$');
    // Check if the URL is for the user domain and belongs to
    // another user
    return !sameUserRe.test(url);
  }
}
