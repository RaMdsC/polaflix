import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'pol-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hiddenPassword: boolean;
  registerForm: FormGroup;
  formSubmitAttempt: boolean;

  constructor(public formService: FormService) {

  }

  ngOnInit() {
    // Set password field as hidden
    this.hiddenPassword = true;

    // Set the form controls
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required], this.formService.unique('User', 'userName')),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    });

    // Set the submit attempt to false
    this.formSubmitAttempt = false;
  }

  onSubmit() {

  }
}
