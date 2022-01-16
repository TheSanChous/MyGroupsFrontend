import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from "../../../../../api/groups/group.service";
import {GroupModel} from "../../../../../models/group/GroupModel";
import {MatDialog} from "@angular/material/dialog";
import {QuestionDialogComponent} from "../../../../components/dialogs/question-dialog/question-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.css']
})
export class GroupOverviewComponent implements OnInit {

  @Input()
  groupId!: string;
  group!: GroupModel;

  constructor(private readonly groupService: GroupService,
              private readonly dialog: MatDialog,
              private readonly router: Router,
              private readonly snackbar: MatSnackBar,
              private readonly clipboard: ClipboardService) { }

  ngOnInit(): void {
    this.loadGroup();
  }

  loadGroup() {
    this.groupService.getGroup(this.groupId)
      .subscribe(group => {
        this.group = group;
      })
  }

  leaveGroup() {
    this.dialog.open(QuestionDialogComponent, {
      data:{
        text: "Are you sure?"
      }
    })
      .afterClosed()
      .subscribe((leave) => {
        console.log(leave);
        if(leave) {
          this.groupService.leaveGroup(this.group.id)
            .subscribe((res) => {
              this.router.navigateByUrl('/groups')
            }, (error) => {
              let errors = error.errors.join(', ');
              this.snackbar.open(errors, "Ok", {
                duration: 3000
              });
            });
        }
      })
  }

  copyIdentifierClick() {
    this.clipboard.copy(this.group.identifier);
    this.snackbar.open("Copied successful!", "Ok", {
      duration: 3000
    });
  }
}
