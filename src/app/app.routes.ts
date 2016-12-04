import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { NoContentComponent } from './no-content';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: TaskComponent },
  { path: 'task', component: TaskComponent },
  { path: '**', component: NoContentComponent },
];
