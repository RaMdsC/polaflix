import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

import { StatusResponse } from 'src/app/interfaces/responses/status-response.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class FormService {

  strongPasswordMessage: string;
  forbiddenCharacters: Object;

  constructor(private apiService: ApiService,
              private notificationService: NotificationService) {
    // Shows which security feature the password lacks
    this.strongPasswordMessage = '';
    // Registers forbidden characters
    this.forbiddenCharacters = {
      'user/username' : [],
      'user/firstname' : [],
      'user/lastname' : []
    };
  }

  unique(domain: string, field: string): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return new Promise<any>(
        (resolve, reject) => {
          this.apiService.get<StatusResponse>(`${domain}/check/${field}/${control.value}`)
            .subscribe(
              (statusResponse: StatusResponse) => {
                switch (statusResponse.statusCode) {
                  case 0:
                    // If it does exist, trigger validator
                    resolve({ unique : true });
                    break;
                  case 1:
                    resolve(null);
                    break;
                }
              },
              (error: any) => {
                // An error was received
                this.notificationService.showNotification(error);
                reject(error);
              }
            );
        });
    };
  }

  noForbiddenCharacters(domain: string, field: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Check if any special character matches the control value
      // Store the unique matches for showing on UI
      const matches = control.value.match(environment.forbiddenCharactersRe);
      if (matches) {
        this.forbiddenCharacters[`${domain}/${field}`] = Array.from(new Set(matches[0]));
        return { noForbiddenCharacters : true };
      } else {
        return null;
      }
    };
  }

  strongPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Check if password
      const passwordValue: string = control.value;
      // Empty, do not trigger, required will take care
      if (!passwordValue) {
        return null;
      }
      // Has at least one lowercase letter
      if (!/[a-z]+/.test(passwordValue)) {
        this.strongPasswordMessage = 'one lowercase';
        return { strongPassword : true };
      }
      if (!/[0-9]+/.test(passwordValue)) {
        this.strongPasswordMessage = 'one number';
        return { strongPassword : true };
      }
      if (!/[$@$!%*?&]+/.test(passwordValue)) {
        this.strongPasswordMessage = 'one of [$@$!%*?&]';
        return { strongPassword : true };
      }
      if (passwordValue.length < 8) {
        this.strongPasswordMessage = '8 or more characters';
        return { strongPassword : true };
      }

      // Password is strong!
      return null;
    };
  }

  matchingPasswords(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup: FormGroup = control as FormGroup;
      // Check if passwords match
      if (formGroup.controls.password.value !== formGroup.controls.repeatPassword.value) {
        if (formGroup.controls.repeatPassword.errors) {
          // If there are already other errors, add this one
          formGroup.controls.repeatPassword.errors.matchingPasswords = true;
        } else {
          // If not, create them and add it
          formGroup.controls.repeatPassword.setErrors({ matchingPasswords : true });
        }
        return { matchingPasswords : true };
      } else if (formGroup.controls.repeatPassword.errors) {
        if (Object.keys(formGroup.controls.repeatPassword.errors).length === 1
            && formGroup.controls.repeatPassword.hasError('matchingPasswords')) {
          // If this is the only error present, set them to null
          formGroup.controls.repeatPassword.setErrors(null);
        } else {
          // If there are more, try to delete only this one
          delete formGroup.controls.repeatPassword.errors.matchingPasswords;
        }
      }
      return null;
    };
  }
}
