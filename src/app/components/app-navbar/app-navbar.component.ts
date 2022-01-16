import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationCoreService} from "../../../core/authentication/authenticationCore.service";
import {CurrentGroupService} from "../../../core/groups/current-group.service";

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  @Input()
  sidebar: any;

  pageTitle: string = "My Groups";

  isAuthenticated: boolean = this.authenticationCore.isAuthenticated();

  constructor(readonly authenticationCore: AuthenticationCoreService,
              readonly currentGroup: CurrentGroupService) { }

  ngOnInit(): void {
    this.authenticationCore.onLogout
      .subscribe(() => {
        this.isAuthenticated = false;
      })
    this.authenticationCore.onLogin
      .subscribe(() => {
        this.isAuthenticated = true;
      })
  }

  logout() {
    this.authenticationCore.logout();
  }

  menuClick() {
    this.sidebar.toggle();
    console.log(this.currentGroup.getGroup());
  }
}
