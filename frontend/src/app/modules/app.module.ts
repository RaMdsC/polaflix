import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { RoutingModule } from "src/app/modules/routing.module";
import { MaterialModule } from "src/app/modules/material.module";

import { AppComponent } from "src/app/components/app.component";
import { InAppComponent } from "src/app/components/in-app/in-app.component";
import { UserSpaceComponent } from "src/app/components/in-app/user-space/user-space.component";
import { LandingComponent } from "src/app/components/landing/landing.component";
import { LoginComponent } from "src/app/components/landing/login/login.component";
import { RegisterComponent } from "src/app/components/landing/register/register.component";
import { PageNotFoundComponent } from "src/app/components/page-not-found/page-not-found.component";
import { NotificationComponent } from "src/app/components/notification/notification.component";

import { ApiService } from "src/app/services/api.service";
import { AuthGuardService } from "src/app/services/auth-guard.service";
import { AuthService } from "src/app/services/auth.service";
import { DataService } from "src/app/services/data.service";
import { FormService } from "src/app/services/form.service";

@NgModule({
  declarations: [
    AppComponent,
    InAppComponent,
    UserSpaceComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RoutingModule,
    MaterialModule
  ],
  providers: [
    ApiService,
    AuthGuardService,
    AuthService,
    DataService,
    FormService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    NotificationComponent
  ]
})
export class AppModule { 

}
