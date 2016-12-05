import { Component, OnInit } from '@angular/core';

import { Task } from './../task-service/task';
import { TaskService } from './../task-service/task.service';

@Component({
  selector: 'task-nav',
  templateUrl: './task-nav.component.html',
  styleUrls: ['./task-nav.component.scss'],
  providers: []
})
export class TaskNavComponent implements OnInit {
  todaySelected = false;
  weekSelected = false;
  allSelected = false;
  activeSelected = false;

  searchTerm = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void { }

  setSelected(filter) {
    if (filter === 'today') {
      this.todaySelected = true;
      this.weekSelected = false;
      this.allSelected = false;
      this.activeSelected = false;
    } else if (filter === 'week') {
      this.todaySelected = false;
      this.weekSelected = true;
      this.allSelected = false;
      this.activeSelected = false;
    } else if (filter === 'all') {
      this.todaySelected = false;
      this.weekSelected = false;
      this.allSelected = true;
      this.activeSelected = false;
    } else if (filter === 'active') {
      this.todaySelected = false;
      this.weekSelected = false;
      this.allSelected = false;
      this.activeSelected = true;
    }
  }

  setFilter(filter, term?): void {
    this.setSelected(filter);
    this.taskService.getFilterdTask(filter, term);
  }

  addTask(): void {
    this.taskService.addTask();
  }

  nextTask(): void {
    this.taskService.nextTask();
  }

  prevTask(): void {
    this.taskService.prevTask();
  }

}
