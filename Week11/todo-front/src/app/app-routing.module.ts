import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksListsComponent } from './tasks-lists/tasks-lists.component';
import { TasksListsDetailComponent } from './tasks-lists-detail/tasks-lists-detail.component';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import { TasksOfTasksListsComponent } from './tasks-of-tasks-lists/tasks-of-tasks-lists.component';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

const routes: Routes = [
  {path: 'tasks_lists', component: TasksListsComponent},
  {path: 'tasks_lists/:id', component: TasksListsDetailComponent},
  {path: 'tasks/:id', component: TasksDetailComponent},
  {path: 'tasks_lists/:id/tasks', component: TasksOfTasksListsComponent}
];

@NgModule( {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
