import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InAppComponent } from "src/app/components/in-app/in-app.component";
import { UserSpaceComponent } from "src/app/components/in-app/user-space/user-space.component";
import { LandingComponent } from "src/app/components/landing/landing.component";
import { LoginComponent } from "src/app/components/landing/login/login.component";
import { RegisterComponent } from "src/app/components/landing/register/register.component";
import { PageNotFoundComponent } from "src/app/components/page-not-found/page-not-found.component";

import { AuthGuardService } from "src/app/services/auth-guard.service";

const routes: Routes = [
  // In app path
  // If there is a logged in user, allow access
  { path: "",
    component: InAppComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "users/:userName",
        component: UserSpaceComponent
      }
    ]
  },
  // Landing path
  // If no logged in user, go here
  { path: "",
    component: LandingComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  },
  // If route is not recognized, go to Page Not Found
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { 

}
