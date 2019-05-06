import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { TaskList, Task, TaskSimple, TaskNew, AuthResponse } from '../models/model';
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

  createTasksLists(name: any): Promise<TaskList> {
    return this.post(`http://localhost:8000/api/tasks_lists/`, {
      name:name
    });
  }

  getTasksListsDetail(id: number): Promise<TaskList> {
    return this.get(`http://127.0.0.1:8000/api/tasks_lists/${id}/`, {});
  }

  deleteTaskList(id: number): Promise<any> {
    return this.delete(`http://localhost:8000/api/tasks_lists/${id}/`, {});
  }

  updateTasksListsDetail(taskList: TaskList): Promise<TaskList> {
    return this.put(`http://localhost:8000/api/tasks_lists/${taskList.id}/`, {
      name: taskList.name
    });
  }

  getTasksOfTasksLists(id: number): Promise<TaskSimple[]> {
    return this.get(`http://127.0.0.1:8000/api/tasks_lists/${id}/tasks/`, {});
  }

  createTask(taskListId: number, name: string, created_at: string, due_on: string, status: string): Promise<TaskNew> {
    return this.post(`http://localhost:8000/api/tasks_lists/${taskListId}/tasks/`, {
      name: name,
      created_at: created_at,
      due_on: due_on,
      status: status
    });
  }

  getTasksDetail(id: number): Promise<Task> {
    return this.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {});
  }

  updateTask(task: Task): Promise<Task> {
    return this.put(`http://localhost:8000/api/tasks/${task.id}/`, {
      name: task.name,
      created_at: task.created_at,
      due_on: task.due_on,
      status: task.status
    });
  }

  deleteTask(task: Task): Promise<any> {
    return this.delete(`http://localhost:8000/api/tasks/${task.id}/`, {});
  }

  login(username: any, password: any): Promise<AuthResponse> {
    return this.post(`http://localhost:8000/api/login/`, {
      username: username,
      password: password
    });
  }

  logout(): Promise <any>{
    return this.post(`http://localhost:8000/api/logout/`, {
    });
  }

  register(username: any, password: any): Promise<AuthResponse> {
    return this.post(`http://localhost:8000/api/register/`, {
      username: username,
      password: password
    });
  }
}
