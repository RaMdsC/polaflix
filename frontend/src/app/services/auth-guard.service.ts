import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
      
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Get currently logged in user from local storage
    let loggedInUserInfo = localStorage.getItem("loggedInUserInfo");

    if(!loggedInUserInfo) {
      // Redirect to login if there is no user
      this.router.navigate(["/login"]);
      return false;
    } else if(!state.url || this.otherUser(loggedInUserInfo["userName"], state.url)){
      // Redirect to its user space if the requested URL is empty or
      // it is based in another user's domain
      this.router.navigate([`/users/${loggedInUserInfo["userName"]}`]);
      return false;
    } else {
      // Allow access otherwise
      return true;
    }
  }

  private otherUser(userName: string, url: string) {
    // TODO
    console.log(url);
  }
}
