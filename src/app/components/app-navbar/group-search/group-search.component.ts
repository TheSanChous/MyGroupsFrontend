import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../../api/groups/group.service";
import {GroupModel} from "../../../../models/group/GroupModel";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteActivatedEvent} from "@angular/material/autocomplete";
import {Router} from "@angular/router";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.css']
})
export class GroupSearchComponent implements OnInit {
  groups!: GroupModel[];

  constructor(private readonly groupService: GroupService,
              private readonly snackbar: MatSnackBar,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroups()
      .subscribe((groups) => {
        this.groups = groups;
      }, error => {
        let errors = error.join(', ');
        this.snackbar.open(errors, "Ok", {
          duration: 2000
        });
      });
  }

  groupSelected(event: MatOptionSelectionChange) {
    let id = event.source.value.id;
    this.router.navigateByUrl(`/group/${id}`);
  }
}
