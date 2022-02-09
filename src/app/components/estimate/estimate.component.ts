import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CompletedTaskService} from "../../../api/tasks/completed-task.service";

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {

  description: FormControl = new FormControl('', Validators.compose([Validators.required]));

  value: FormControl = new FormControl(10, Validators.required);

  constructor(public dialog: MatDialogRef<EstimateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly completedTaskService: CompletedTaskService) { }

  ngOnInit(): void {
  }

  submitClick() {
    const grade = {
      completedTaskId: this.data.completedTaskId,
      description: this.description.value,
      value: this.value.value
    }
    this.completedTaskService.estimateTask(grade)
      .subscribe(() => {
        this.dialog.close();
      });
  }

}
