import {Component, Input, OnInit} from '@angular/core';
import {GroupModel} from "../../../../../models/group/GroupModel";

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit {

  @Input()
  group!: GroupModel;

  constructor() { }

  ngOnInit(): void {
  }

}
