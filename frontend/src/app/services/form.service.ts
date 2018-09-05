import { Injectable } from "@angular/core";
import { FormGroup, ValidatorFn, AbstractControl } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class FormService {
  
  constructor() {

  }

  isFieldInvalid(field: string, form: FormGroup, formSubmitAttempt: boolean) {
    return ((!form.get(field).valid && form.get(field).touched)
         || (form.get(field).untouched && formSubmitAttempt));
  }

  //unique(): ValidatorFn {
  //  return (control: AbstractControl): { [key: string]: any } | null => {
  //    this.
  //  }
  //}
}
