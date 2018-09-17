import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from 'src/app/modules/routing.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { MDBModule } from 'src/app/modules/mdb.module';
import { SocialLoginModule, AuthServiceConfig as ASConfig, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { ErrorStateMatcher } from '@angular/material';

import { AppComponent } from 'src/app/components/app.component';
import { InAppComponent } from 'src/app/components/in-app/in-app.component';
import { HeaderComponent } from 'src/app/components/in-app/header/header.component';
import { LinkBarComponent} from 'src/app/components/in-app/link-bar/link-bar.component';
import { UserSpaceComponent } from 'src/app/components/in-app/user-space/user-space.component';
import { LandingComponent } from 'src/app/components/landing/landing.component';
import { LoginComponent } from 'src/app/components/landing/login/login.component';
import { RegisterComponent } from 'src/app/components/landing/register/register.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserGuardService } from 'src/app/services/user-guard.service';
import { InstantErrorStateMatcher } from 'src/app/utils/instant.error-state-matcher';

const asConfig = new ASConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('139146548084-590q7iqfcvlm9ma9m65n7o2iog7pnkst.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('303645493523253')
  }
]);

export function provideASConfig(): ASConfig {
  return asConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    InAppComponent,
    HeaderComponent,
    LinkBarComponent,
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
    MaterialModule,
    MDBModule,
    SocialLoginModule
  ],
  providers: [
    ApiService,
    AuthService,
    DataService,
    FormService,
    NotificationService,
    UserGuardService,
    {
      provide: AuthServiceConfig,
      useFactory: provideASConfig
    },
    {
      provide: ErrorStateMatcher,
      useClass: InstantErrorStateMatcher
    }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    NotificationComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {

}
