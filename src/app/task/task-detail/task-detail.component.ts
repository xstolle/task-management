import { Component, OnInit } from '@angular/core';

import { Task } from './../task-service/task';
import { TaskService } from './../task-service/task.service';

@Component({
  selector: 'task-detail',
  providers: [],
  templateUrl: 'task-detail.component.html',
  styleUrls: ['task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task$;
  selectedTask: Task;
  priorities;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.priorities = this.taskService.getPriority();
    this.task$ = this.taskService.getSelectedTasksObservable()
      .subscribe(
      data => {
        this.selectedTask = data;
        console.log('Task List getSelectedTaskObservable Data: ' + data);
      },
      err => {
        console.log('Task List getSelectedTaskObservable Error: ' + err);
      },
      () => {
        console.log('Task List getSelectedTaskObservable Completed');
      })
  }

  ngOnDestroy(): void {
    this.task$.unsubscribe();
  }

  changePriority(priority: number): void {
    this.selectedTask.priority = priority;
  }

  save(task: Task): void {
    this.taskService.save(task);
  }

  cancel(): void {
    this.taskService.cancel();
  }

  opentab(): void {
    window.open('http://www.nyt.com', '_blank');
  }
}
