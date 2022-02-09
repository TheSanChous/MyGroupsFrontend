import {GroupModel} from "../group/GroupModel";

export interface TaskModel {
  id: string,
  title: string,
  description: string,
  group: GroupModel,
  fileId: string
}
