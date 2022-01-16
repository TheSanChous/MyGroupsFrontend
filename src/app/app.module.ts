import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatLineModule, MatNativeDateModule} from "@angular/material/core";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "../core/authentication/token.interceptor";
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { UserGroupsComponent } from './pages/groups/user-groups/user-groups.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { GroupComponent } from './pages/groups/group/group.component';
import { CreateGroupComponent } from './pages/groups/create-group/create-group.component';
import {MatTabsModule} from "@angular/material/tabs";
import { GroupOverviewComponent } from './pages/groups/group/group-overview/group-overview.component';
import {ChartModule} from "angular2-chartjs";
import {MatGridListModule} from "@angular/material/grid-list";
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { LogoutDialogComponent } from './components/dialogs/logout-dialog/logout-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RegistrationComponent} from "./pages/authentication/register/registration.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { GroupSearchComponent } from './components/app-navbar/group-search/group-search.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import { GroupTasksComponent } from './pages/groups/group/group-tasks/group-tasks.component';
import { JoinGroupComponent } from './pages/groups/join-group/join-group.component';
import { QuestionDialogComponent } from './components/dialogs/question-dialog/question-dialog.component';
import { GroupMembersComponent } from './pages/groups/group/group-members/group-members.component';
import {MatListModule} from "@angular/material/list";
import { CreateTaskComponent } from './components/create-task/create-task.component';
import {MatFileUploadModule} from "angular-material-fileupload";
import { GroupTaskComponent } from './pages/groups/group/group-tasks/group-task/group-task.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {HttpSpinerInterceptor} from "../core/http/http-spiner.interceptor";
import { ErrorPageComponent } from './pages/site/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    LoginComponent,
    RegistrationComponent,
    UserGroupsComponent,
    GroupComponent,
    CreateGroupComponent,
    GroupOverviewComponent,
    AppSidebarComponent,
    HomeComponent,
    LogoutDialogComponent,
    GroupSearchComponent,
    GroupTasksComponent,
    JoinGroupComponent,
    QuestionDialogComponent,
    GroupMembersComponent,
    CreateTaskComponent,
    GroupTaskComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatLineModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    ChartModule,
    MatGridListModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatListModule,
    MatFileUploadModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpSpinerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
