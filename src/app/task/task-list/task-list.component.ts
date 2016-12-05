import { Component } from '@angular/core';

import { Task } from './../task-service/task';
import { TaskService } from './../task-service/task.service';

@Component({
  selector: 'task-list',
  //template: `<h1>Hello task list</h1>`,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: []
})
export class TaskListComponent {
  tasks$;
  task$;
  filteredTasks;
  selectedTask;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getFilteredTasksObservable()
      .subscribe(
      data => {
        this.filteredTasks = data;
        console.log('Task List getFilteredTasksObservable Data: ' + data);
      },
      err => {
        console.log('Task List getFilteredTasksObservable Error: ' + err);
      },
      () => {
        console.log('Task List getFilteredTasksObservable Completed');
      })

    this.task$ = this.taskService.getSelectedTasksObservable()
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
    this.tasks$.unsubscribe();
    this.task$.unsubscribe();
  }

  onSelect(task) {
    this.taskService.selectTask(task);
  }

  deleteTask(taskid, e) {
    this.taskService.deleteTask(taskid);
  }
}
