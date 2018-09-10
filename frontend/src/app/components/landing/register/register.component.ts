import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService as ASService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

import { FormService } from 'src/app/services/form.service';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RegisterRequest } from 'src/app/interfaces/requests/register-request.interface';
import { StatusResponse } from 'src/app/interfaces/responses/status-response.interface';

@Component({
  selector: 'pol-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hiddenPassword: boolean;
  registerForm: FormGroup;

  constructor(public formService: FormService,
              private asService: ASService,
              private apiService: ApiService,
              private dataService: DataService,
              private notificationService: NotificationService,
              private router: Router) {

  }

  ngOnInit(): void {
    // Set password field as hidden
    this.hiddenPassword = true;

    // Set the form controls
    this.registerForm = new FormGroup(
      // controls
      {
        userName: new FormControl(
          // formState
          '',
          // validatorOrOpts
          [
            Validators.required,
            this.formService.noForbiddenCharacters('user', 'username')
          ],
          // asyncValidator
          this.formService.unique('user', 'username')
        ),
        firstName: new FormControl(
          '',
          [
            this.formService.noForbiddenCharacters('user', 'firstname')
          ]
        ),
        lastName: new FormControl(
          '',
          [
            this.formService.noForbiddenCharacters('user', 'lastname')
          ]
        ),
        password: new FormControl(
          '',
          [
            Validators.required,
            this.formService.strongPassword()
          ]
        ),
        repeatPassword: new FormControl(
          '',
          [
            Validators.required
          ]
        )
      },
      // validatorOrOpts
      this.formService.matchingPasswords(),
      // asyncValidator
      null
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Add new User to the Service
      const registerRequest: RegisterRequest = new RegisterRequest(
        this.registerForm.controls.userName.value,
        this.registerForm.controls.firstName.value,
        this.registerForm.controls.lastName.value,
        this.registerForm.controls.password.value
      );

      this.apiService.post<StatusResponse>('user/register', registerRequest)
        .subscribe(
          (statusResponse: StatusResponse) => {
            switch (statusResponse.statusCode) {
              case 0:
                // User has been stored in the Service database
                // Add it to localStorage and dataService
                localStorage.setItem('loggedInUserInfo', JSON.stringify({
                  userName: registerRequest.userName,
                  password: registerRequest.password
                }));
                this.dataService.loggedInUser.userName = registerRequest.userName;
                this.dataService.loggedInUser.password = registerRequest.password;
                // Navigate to user space
                this.router.navigateByUrl(`/users/${registerRequest.userName}`);
                break;
            }
          },
          (error: any) => {
            // An error was received
            this.notificationService.showNotification(error);
          }
        );
    }
  }

  signInWithFb(): void {
    this.handleData(this.asService.signIn(FacebookLoginProvider.PROVIDER_ID));
  }

  signInWithGo(): void {
    this.handleData(this.asService.signIn(GoogleLoginProvider.PROVIDER_ID));
  }

  private handleData(promise: Promise<SocialUser>): void {
    promise.then((user: SocialUser) => {
      // When data is retrieved, filter it in the current form so it
      // follows our controls
      let userName: string;
      if (user.name) {
        const nameChunks: Array<string> = user.name.split(/\s+/);
        userName = nameChunks[0].toLowerCase();
        for (const chunk of nameChunks.slice(1)) {
          userName += chunk[0].toLowerCase();
        }
        this.registerForm.controls.userName.setValue(
          this.normalize(userName));
      }
      if (user.firstName) {
        this.registerForm.controls.firstName.setValue(
          this.normalize(user.firstName));
      }
      if (user.lastName) {
        this.registerForm.controls.lastName.setValue(
          this.normalize(user.lastName.split(/\s+/)[0]));
      }
      this.asService.signOut();
    });
  }

  private normalize(toNormalize: string): string {
    return toNormalize.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
