import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/authentication/login/login.component";
import {GroupService} from "../api/groups/group.service";
import {AuthenticationGuard} from "../core/authentication/authentication.guard";
import {UserGroupsComponent} from "./pages/groups/user-groups/user-groups.component";
import {GroupComponent} from "./pages/groups/group/group.component";
import {CreateGroupComponent} from "./pages/groups/create-group/create-group.component";
import {HomeComponent} from "./pages/home/home.component";
import {RegistrationComponent} from "./pages/authentication/register/registration.component";
import {JoinGroupComponent} from "./pages/groups/join-group/join-group.component";
import {GroupTaskComponent} from "./pages/groups/group/group-tasks/group-task/group-task.component";
import {ErrorPageComponent} from "./pages/site/error-page/error-page.component";
import {TasksComponent} from "./pages/tasks/tasks.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "error", component: ErrorPageComponent },
  { path: "register", component: RegistrationComponent },
  { path: "", component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: "tasks", component: TasksComponent, canActivate: [AuthenticationGuard] },
  { path: "groups", component: UserGroupsComponent, canActivate: [AuthenticationGuard] },
  { path: "group/:id", component: GroupComponent, canActivate: [AuthenticationGuard] },
  { path: "groups/create", component: CreateGroupComponent, canActivate: [AuthenticationGuard] },
  { path: "groups/join", component: JoinGroupComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
