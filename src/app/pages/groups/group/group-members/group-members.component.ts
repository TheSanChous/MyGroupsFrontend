import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from "../../../../../api/groups/group.service";
import {GroupModel} from "../../../../../models/group/GroupModel";
import {GroupUserModel} from "../../../../../models/user/GroupUserModel";

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {

  @Input()
  group!: GroupModel;

  groupUsers!: GroupUserModel[];

  constructor(private readonly groupService: GroupService) { }

  ngOnInit(): void {
    this.loadGroupUsers();
    console.log("sdfds");
  }

  loadGroupUsers() {
    this.groupService.getMembers(this.group.id)
      .subscribe((groupUsers) => {
        this.groupUsers = groupUsers;
      });
  }
}
