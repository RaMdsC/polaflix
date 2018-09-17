import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';
import { ContentService } from 'src/app/services/content.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'pol-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hiddenPassword: boolean;
  registerForm: FormGroup;

  constructor(public formService: FormService,
              private contentService: ContentService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    // Set password field as hidden
    this.hiddenPassword = true;

    // Set the form controls
    this.registerForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        this.formService.noForbiddenCharacters('user', 'username')
      ], this.formService.unique('user', 'username')),
      firstName: new FormControl('', [
        this.formService.noForbiddenCharacters('user', 'firstname')
      ]),
      lastName: new FormControl('', [
        this.formService.noForbiddenCharacters('user', 'lastname')
      ]),
      password: new FormControl('', [
        Validators.required,
        this.formService.strongPassword()
      ]),
      repeatPassword: new FormControl('', [
        Validators.required
      ])
    }, this.formService.matchingPasswords(), null);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Add new User to the Service
      this.contentService.addUser(this.registerForm.controls.userName.value,
                                  this.registerForm.controls.firstName.value,
                                  this.registerForm.controls.lastName.value,
                                  this.registerForm.controls.password.value);
    }
  }

  signInWithFb(): void {
    this.handleData(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
  }

  signInWithGo(): void {
    this.handleData(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID));
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
      this.authService.signOut();
    });
  }

  private normalize(toNormalize: string): string {
    return toNormalize.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
