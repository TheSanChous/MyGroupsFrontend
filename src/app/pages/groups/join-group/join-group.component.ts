import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../../api/groups/group.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {

  joinModel: FormGroup = new FormGroup({
    id: new FormControl('', Validators.compose([Validators.required]))
  })

  isLoading: boolean = false;

  constructor(private readonly groupService: GroupService,
              private readonly router: Router,
              private readonly snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  joinClick() {
    this.isLoading = true;
    let groupId = this.joinModel.get('id')?.value;

    this.groupService.joinGroup(groupId)
      .subscribe((res) => {
        this.isLoading = false;
        this.router.navigateByUrl(`/group/${groupId}`);
      }, error => {
        this.isLoading = false;
        console.log(error);
        let errors = error.error.join(', ');
        this.snackbar.open(errors, 'Ok', {
          duration: 3000
        });
      });
  }
}
