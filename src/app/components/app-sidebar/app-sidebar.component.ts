import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../api/user.service";
import {UserModel} from "../../../models/user/UserModel";
import {AuthenticationCoreService} from "../../../core/authentication/authenticationCore.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialogComponent} from "../dialogs/logout-dialog/logout-dialog.component";

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent implements OnInit {

  @Input()
  sidebar: any;
  user!: UserModel;

  constructor(private readonly userService: UserService,
              private readonly authenticationCore: AuthenticationCoreService,
              private readonly dialog: MatDialog)
  {
    this.userService.getUserInfo()
      .subscribe((user: UserModel) => {
        this.user = user;
      })
  }

  ngOnInit(): void {
  }

  logoutClick() {
    this.dialog.open(LogoutDialogComponent)
      .afterClosed()
      .subscribe((logout) => {
        if(logout) {
          this.authenticationCore.logout();
          this.sidebar.toggle();
        }
      })
  }
}
