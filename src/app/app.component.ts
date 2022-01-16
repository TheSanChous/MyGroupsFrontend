import { Component } from '@angular/core';
import {AuthenticationCoreService} from "../core/authentication/authenticationCore.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authenticationCore: AuthenticationCoreService) {
  }
}
