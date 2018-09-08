import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

import { CheckResponse } from 'src/app/interfaces/responses/check-response.interface';
import { Observable, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {

  constructor(private apiService: ApiService,
              private notificationService: NotificationService) {

  }

  isFieldInvalid(field: string, validator: string, form: FormGroup, formSubmitAttempt: boolean): boolean {
    return ((form.get(field).hasError(validator) && form.get(field).touched)
         || (form.get(field).untouched && formSubmitAttempt));
  }

  unique(domain: string, field: string): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return new Promise<any>(
        (resolve, reject) => {
          this.apiService.get<CheckResponse>(`${domain.toLowerCase()}/check/${field.toLowerCase()}/${control.value}`)
            .subscribe(
              (checkResponse: CheckResponse) => {
                // If it does exist, trigger validator
                checkResponse.exists ? resolve({ 'unique' : true }) : resolve(null);
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
}
