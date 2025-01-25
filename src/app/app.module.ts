import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './Atividades/task-form/task-form.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { TaskUserComponent } from './Atividades/task-user/task-user.component';
import { SideBarComponent } from './Atividades/side-bar/side-bar.component';
import { ExperienceBarComponent } from './Atividades/experience-bar/experience-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TaskListComponent} from './Atividades/task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskUserComponent,
    SideBarComponent,
    ExperienceBarComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    DragDropModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
