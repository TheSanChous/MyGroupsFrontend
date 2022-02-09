import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GroupModel} from "../../../../models/group/GroupModel";
import {GroupService} from "../../../../api/groups/group.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {CurrentGroupService} from "../../../../core/groups/current-group.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  @ViewChild('tabs', { static: false }) tabs!: ElementRef;

  group!: GroupModel;

  selectedTab: number = 0;

  routeTaskId!: string;

  failedLoadGroup: boolean = false;

  constructor(private readonly groupService: GroupService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly currentGroup: CurrentGroupService) {
    this.activatedRoute.fragment
      .pipe(
        map(fragment => new URLSearchParams(fragment!)),
        map(params => ({
          taskId: params.get('taskId')
        }))
      )
      .subscribe(res => {
        if(res.taskId != null) {
          console.log(res.taskId);
          this.selectedTab = 1
          this.routeTaskId = res.taskId;
        }
      });
  }

  ngOnInit(): void {

    this.loadGroup();
  }

  getGroupIdentifierFromRoute(): Observable<string | null> {
    return this.activatedRoute.paramMap
      .pipe(map((params) => {
        return params.get('id');
      }));
  }

  loadGroup() {
    this.getGroupIdentifierFromRoute()
      .subscribe((id) => {
        this.groupService.getGroupByIdentifier(id!)
          .subscribe((group) => {
            this.currentGroup.setGroup(group);
            this.group = group;
          })
      }, (error) => {
        this.failedLoadGroup = true;
      })
  }

  ngOnDestroy(): void {
    this.currentGroup.setGroup(null);
  }

}
