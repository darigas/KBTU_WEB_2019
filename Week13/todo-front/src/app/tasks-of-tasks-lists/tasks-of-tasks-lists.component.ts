import { Component, OnInit } from '@angular/core';
import { TaskSimple, TaskList, Task } from '../shared/models/model';
import { ProviderService } from '../shared/services/provider.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-of-tasks-lists',
  templateUrl: './tasks-of-tasks-lists.component.html',
  styleUrls: ['./tasks-of-tasks-lists.component.css']
})
export class TasksOfTasksListsComponent implements OnInit {

  public tasks: TaskSimple[] = [];
  // public taskList: any = {};
  public taskList: any = {};

  public id: number;

  public taskName: string = "";
  public task_created_at: any = new Date().toISOString();
  public task_due_on: any;
  public taskStatus: string = "";

  constructor(
    private provider: ProviderService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))

    if (this.id) {
      this.provider.getTasksOfTasksLists(this.id).then(res => {
        this.tasks = res
      })
    }
  }

  createTask(){
    if(this.taskName!='' && this.task_created_at!='' && this.task_due_on!='' && this.taskStatus!='') {
      this.provider.createTask(this.id, this.taskName, this.task_created_at, this.task_due_on, this.taskStatus).then(res => {
        this.tasks.push(res);
      });
    }
  }

  navigateBack() {
    this.location.back()
  }
}
