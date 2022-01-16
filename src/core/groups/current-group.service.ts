import { Injectable } from '@angular/core';
import {GroupModel} from "../../models/group/GroupModel";

@Injectable({
  providedIn: 'root'
})
export class CurrentGroupService {

  constructor() { }

  getGroup() {
    return JSON.parse(sessionStorage.getItem('currentGroup')!);
  }

  setGroup(group: GroupModel | null) {
    sessionStorage.setItem('currentGroup', JSON.stringify(group));
  }
}
