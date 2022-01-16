import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../../api/groups/group.service";
import {GroupModel} from "../../../../models/group/GroupModel";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {

  public groups: GroupModel[] = []

  constructor(private readonly groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getGroups()
      .subscribe((groups) => {
        this.groups = groups;
      })
  }

}
