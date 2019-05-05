import { Component, OnInit } from '@angular/core';
import { TaskList } from '../shared/models/model';
import { ProviderService } from '../shared/services/provider.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public tasksLists: TaskList[] = [];
  public name: string = '';
  public username: string;
  public password: string;
  public logged = false;

  constructor(
    private provider: ProviderService,
    private location: Location
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.logged = true;
    }
    if(this.logged){
      this.provider.getTasksLists().then(res => {
        this.tasksLists = res;
      });
    }
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

  login(){
   if(this.username!=='' && this.password!==''){
     this.provider.login(this.username, this.password).then(res => {
       localStorage.setItem('token', res.token);
       this.logged = true;
       this.provider.getTasksLists().then(result => {
         this.tasksLists = result;
       });
     })
   }
   else {
     console.log('ERROR')
   }
  }

  logout(){
   this.provider.logout().then(res => {
     localStorage.clear();
     this.logged = false;
   });
  }
}
