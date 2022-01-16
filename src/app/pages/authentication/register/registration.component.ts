import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormControlName} from "@angular/forms";
import {AuthenticationService} from "../../../../api/authentication/authentication.service";
import {AuthenticationCoreService} from "../../../../core/authentication/authenticationCore.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-login',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  isLoading: boolean = false;

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.minLength(3)])),
    surname: new FormControl('', Validators.compose([Validators.minLength(3)])),
    email: new FormControl('', Validators.compose([Validators.email])),
    password: new FormControl('', Validators.compose([Validators.minLength(6)]))
  })

  constructor(private readonly authenticationService: AuthenticationService,
              private readonly authenticationCore: AuthenticationCoreService,
              private readonly router: Router,
              private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  loginSubmit() {
    this.isLoading = true;
    this.authenticationService.registration(this.registrationForm.getRawValue())
      .subscribe(res => {
        this.snackBar.open("Registration successful!", "", {
          duration: 4000
        })
        this.authenticationCore.onLogin.emit();
        this.router.navigateByUrl('/login');
      }, error => {
        let errors = error.error.join(', ');
        if(!errors) {
          errors = "Undefined error.";
        }
        this.snackBar.open(errors, 'Ok', {
          duration: 5000
        });
      }).add(() => {
        this.isLoading = false;
    });
  }
}
