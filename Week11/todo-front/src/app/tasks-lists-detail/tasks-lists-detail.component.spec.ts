import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListsDetailComponent } from './tasks-lists-detail.component';

describe('TasksListsDetailComponent', () => {
  let component: TasksListsDetailComponent;
  let fixture: ComponentFixture<TasksListsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksListsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
