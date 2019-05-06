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
  public username: string = '';
  public password: string = '';
  public logged = false;
  public newUsername: any = '';
  public newPassword: any = '';

  constructor(
    private provider: ProviderService,
    private location: Location
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.logged = true;
      console.log(token)
    }
    if(this.logged){
      this.provider.getTasksLists().then(res => {
        this.tasksLists = res;
        console.log(token)
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
   if(this.username !== '' && this.password !== ''){
     this.provider.login(this.username, this.password).then(res => {
       localStorage.setItem('token', res.token);
       this.logged = true;
       this.provider.getTasksLists().then(result => {
         this.tasksLists = result;
         console.log(res.token)
       });
     })
   }
 }

 logout(){
   this.provider.logout().then(res => {
     localStorage.clear();
     this.logged = false;
   });
 }

 register(){
   if(this.newUsername !== '' && this.newPassword !== ''){
     this.provider.register(this.newUsername, this.newPassword).then(res => {
       localStorage.setItem('token', res.token);
       this.logged = true;
       this.newUsername = '';
       this.newPassword = '';
       this.provider.getTasksLists().then(result => {
         this.tasksLists = result;
       });
     })
   }
 }
}
