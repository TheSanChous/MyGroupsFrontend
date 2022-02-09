import {UserModel} from "../user/UserModel";
import {GradeModel} from "./GradeModel";

export interface CompletedTaskModel {
  id: string,
  title: string,
  description: string,
  uploadedAt: Date,
  creator: UserModel,
  taskId: string,
  grade: GradeModel,
  fileUrl: string
}
