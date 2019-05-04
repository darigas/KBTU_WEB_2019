import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/model';
import { ProviderService } from '../shared/services/provider.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-detail',
  templateUrl: './tasks-detail.component.html',
  styleUrls: ['./tasks-detail.component.css']
})
export class TasksDetailComponent implements OnInit {

  public id: number = 0;

  public task: any = {}

  public taskName: string ="";
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

    if(this.id){
      this.provider.getTasksDetail(this.id).then(res => {
        this.task = res
      })
    }
  }

  updateTask(task: Task) {
    this.provider.updateTask(task).then(res => {
      console.log(task + ' updated');
    });
  }

  deleteTask(task: Task){
    this.provider.deleteTask(task).then(() => {
      console.log(task + ' deleted');
    });
  }

  navigateBack() {
    this.location.back()
  }
}
