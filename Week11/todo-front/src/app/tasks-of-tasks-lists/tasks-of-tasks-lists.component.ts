import { Component, OnInit } from '@angular/core';
import { TaskSimple } from '../shared/models/model';
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
  public taskList: any = {};

  public id: number = 0;

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

  navigateBack() {
    this.location.back()
  }
}
