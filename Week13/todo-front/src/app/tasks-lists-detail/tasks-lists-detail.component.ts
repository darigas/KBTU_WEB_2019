import { Component, OnInit } from '@angular/core';
import { TaskList } from '../shared/models/model';
import { ProviderService } from '../shared/services/provider.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-lists-detail',
  templateUrl: './tasks-lists-detail.component.html',
  styleUrls: ['./tasks-lists-detail.component.css']
})
export class TasksListsDetailComponent implements OnInit {

  public id: number = 0;

  public taskList: any = {};

  constructor(
    private provider: ProviderService,
    private router: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get('id'))

    if(this.id){
      this.provider.getTasksListsDetail(this.id).then(res => {
        this.taskList = res
      })
    }
  }

  updateTasksLists(taskList: TaskList) {
    this.provider.updateTasksListsDetail(taskList).then(res => {
      console.log(taskList.name + ' updated');
    });
  }

  deleteTaskList(){
    this.provider.deleteTaskList(this.taskList.id).then(()=> {
      this.location.back();
    });
  }

  navigateBack() {
    this.location.back()
  }
}
