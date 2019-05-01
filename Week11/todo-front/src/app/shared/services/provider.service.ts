import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { TaskList, Task, TaskSimple } from '../models/model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getTasksLists(): Promise<TaskList[]> {
    return this.get(`http://127.0.0.1:8000/api/tasks_lists/`, {});
  }

  getTasksListsDetail(id: number): Promise<TaskList> {
    return this.get(`http://127.0.0.1:8000/api/tasks_lists/${id}/`, {});
  }

  getTasksDetail(id: number): Promise<Task> {
    return this.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {});
  }

  getTasksOfTasksLists(id: number): Promise<TaskSimple[]> {
    return this.get(`http://127.0.0.1:8000/api/tasks_lists/${id}/tasks/`, {});
  }
}
