import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pol-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hiddenPassword: boolean;
  loginForm: FormGroup;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    // Set password field as hidden
    this.hiddenPassword = true;

    // Set the form controls
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Call the authentication service for logging in
      this.authService.login(this.loginForm.controls.userName.value,
                             this.loginForm.controls.password.value);
    }
  }
}
