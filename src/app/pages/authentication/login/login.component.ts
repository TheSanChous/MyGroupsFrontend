import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormControlName} from "@angular/forms";
import {AuthenticationService} from "../../../../api/authentication/authentication.service";
import {AuthenticationCoreService} from "../../../../core/authentication/authenticationCore.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
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
    this.authenticationService.login(this.loginForm.getRawValue())
      .subscribe(res => {
        this.authenticationCore.saveToken(res.accessToken);
        this.snackBar.open("Login successful!", "", {
          duration: 4000
        })
        this.authenticationCore.onLogin.emit();
        this.router.navigateByUrl('');
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
