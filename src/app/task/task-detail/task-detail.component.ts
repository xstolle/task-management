import { Component, OnInit } from '@angular/core';

import { Task } from './../task-service/task';
import { TaskService } from './../task-service/task.service';

@Component({
  selector: 'task-detail',
  providers: [TaskService],
  templateUrl: 'task-detail.component.html',
  styleUrls: ['task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task$;
  selectedTask: Task;
  priorities;

  constructor() { }

  ngOnInit(): void {
    this.priorities = TaskService.getPriority();
    this.task$ = TaskService.getSelectedTasksObservable()
      .subscribe(
      data => {
        this.selectedTask = data;
        console.log('Task List getSelectedTasksObservable Data: ' + data);
      },
      err => {
        console.log('Task List getSelectedTasksObservable Error: ' + err);
      },
      () => {
        console.log('Task List getSelectedTasksObservable Completed');
      })
  }

  ngOnDestroy(): void {
    this.task$.unsubscribe();
  }

  changePriority(priority: number): void {
    this.selectedTask.priority = priority;
  }

  save(task: Task): void {
    TaskService.save(task);
  }

  cancel(): void {
    TaskService.cancel();
  }
}
