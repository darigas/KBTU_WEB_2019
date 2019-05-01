import { Component, OnInit } from '@angular/core';
import { TaskList } from '../shared/models/model';
import { ProviderService } from '../shared/services/provider.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.component.html',
  styleUrls: ['./tasks-lists.component.css']
})

export class TasksListsComponent implements OnInit {

  public tasksLists: TaskList[] = [];
  public name: string = '';

  constructor(
    private provider: ProviderService,
    private location: Location
  ) { }

  ngOnInit() {
    this.provider.getTasksLists().then(res => {
      this.tasksLists = res
    })
  }

  createTaskList() {
    if (this.name != '') {
      this.provider.createTasksLists(this.name).then(res => {
        this.tasksLists.push(res);
      });
    }
  }

  navigateBack() {
    this.location.back()
  }
}
