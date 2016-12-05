import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdSlideToggleModule } from '@angular2-material/slide-toggle';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdInputModule } from '@angular2-material/input';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdRadioModule } from '@angular2-material/radio';
import { MdListModule} from '@angular2-material/list';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MdToolbarModule} from '@angular2-material/toolbar';
import { MomentModule } from 'angular2-moment';

import { TaskService } from './task-service/task.service';
import { SharedModule } from './../shared/shared.module';
import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskNavComponent } from './task-nav/task-nav.component';

/**
 *
 */
@NgModule({
  declarations: [
    TaskComponent,
    TaskDetailComponent,
    TaskListComponent,
    TaskNavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdSlideToggleModule,
    MdGridListModule,
    SharedModule,
    MomentModule,
    MdInputModule,
    MdCheckboxModule,
    MdRadioModule,
    MdListModule,
    MdToolbarModule
  ],
  exports: [
    TaskComponent,
    TaskDetailComponent,
    TaskListComponent,
    TaskNavComponent
  ],
  providers: [
    MdIconRegistry,
    MdUniqueSelectionDispatcher,
    TaskService
  ]
})
export class TaskModule { }
