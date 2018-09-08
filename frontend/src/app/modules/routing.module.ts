import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InAppComponent } from 'src/app/components/in-app/in-app.component';
import { UserSpaceComponent } from 'src/app/components/in-app/user-space/user-space.component';
import { LandingComponent } from 'src/app/components/landing/landing.component';
import { LoginComponent } from 'src/app/components/landing/login/login.component';
import { RegisterComponent } from 'src/app/components/landing/register/register.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

import { UserGuardService } from 'src/app/services/user-guard.service';

const routes: Routes = [
  // Root path, redirect to users
  { path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  // In app path
  // If there is a logged in user, go here
  { path: '',
    component: InAppComponent,
    children: [
      {
        path: 'users',
        canActivate: [UserGuardService],
        children: [
          {
            path: ':userName',
            component: UserSpaceComponent
          }
        ]
      }
    ]
  },
  // Landing path
  // If no logged in user, go here
  { path: '',
    component: LandingComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  // If route is not recognized, go to Page Not Found
  {
    path: '**',
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
