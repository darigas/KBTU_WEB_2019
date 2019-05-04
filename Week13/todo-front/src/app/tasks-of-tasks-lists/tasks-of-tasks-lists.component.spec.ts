import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksOfTasksListsComponent } from './tasks-of-tasks-lists.component';

describe('TasksOfTasksListsComponent', () => {
  let component: TasksOfTasksListsComponent;
  let fixture: ComponentFixture<TasksOfTasksListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksOfTasksListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksOfTasksListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
