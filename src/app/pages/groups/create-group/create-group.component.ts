import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../../../api/groups/group.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  isLoading: boolean = false;

  createModel = new FormGroup({
    title: new FormControl('', Validators.compose([Validators.requiredTrue, Validators.minLength(3)])),
    description: new FormControl('')
  })

  constructor(private readonly groupService: GroupService,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router) { }

  ngOnInit(): void {
  }

  createClick() {
    this.isLoading = true;
    this.groupService.createGroup(this.createModel.getRawValue())
      .subscribe((newGroupIdentifier) => {
        console.log(newGroupIdentifier);
        this.isLoading = false;
        this.snackBar.open(`Created successfully!`,'', {
          duration: 3000
        });
        this.router.navigateByUrl(`/group/${newGroupIdentifier}`);
      }, (error) => {
        console.log(error);
        this.isLoading = false;
        this.snackBar.open(`Error! ${error.error.errors}`,'', {
          duration: 3000
        });
      });
  }

}
