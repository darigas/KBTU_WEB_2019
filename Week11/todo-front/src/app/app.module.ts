import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { TasksListsComponent } from './tasks-lists/tasks-lists.component';
import { TasksListsDetailComponent } from './tasks-lists-detail/tasks-lists-detail.component';
import { TasksOfTasksListsComponent } from './tasks-of-tasks-lists/tasks-of-tasks-lists.component';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {ProviderService} from './shared/services/provider.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TasksListsComponent,
    TasksListsDetailComponent,
    TasksOfTasksListsComponent,
    TasksDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    ProviderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
