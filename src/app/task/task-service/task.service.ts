import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import { Task } from './task';

@Injectable()
export class TaskService {
  tasks: Task[] = [
    { id: 1, title: 'Christmas plan', description: 'where to go, who to meet and what to buy for gifts', state: true, priority: 2, dateCreated: '2016-11-27T23:28:56.782Z', dateStart: '2016-12-04T23:28:56.782Z', dateEnd: '2016-12-24T23:28:56.782Z', group: 'home' },
    { id: 2, title: 'swimming City', description: 'need to email Patricia to get a date and time, CityBad', state: false, priority: 2, dateCreated: '2016-12-01T23:28:56.782Z', dateStart: '2016-12-06T23:28:56.782Z', dateEnd: '2016-12-06T23:28:56.782Z', group: 'home' },
    { id: 3, title: 'hiking with SAC', description: 'when in December has a tour and if I have no other plan on the day', state: false, priority: 1, dateCreated: '2016-12-03T23:28:56.782Z', dateStart: '2016-12-10T23:28:56.782Z', dateEnd: '2016-12-10T23:28:56.782Z', group: 'home' },
    { id: 4, title: 'Christmas market', description: 'which one to check and make sure go there without dinner', state: false, priority: 1, dateCreated: '2016-12-03T23:28:56.782Z', dateStart: '2016-12-09T23:28:56.782Z', dateEnd: '2016-12-09T23:28:56.782Z', group: 'home' },
    { id: 5, title: 'call home', description: 'every two weeks', state: false, priority: 1, dateCreated: '2016-11-30T23:28:56.782Z', dateStart: '2016-12-05T23:28:56.782Z', dateEnd: '2016-12-10T23:28:56.782Z', group: 'home' },
    { id: 6, title: 'food shopping', description: 'twice a week', state: false, priority: 3, dateCreated: '2016-11-30T23:28:56.782Z', dateStart: '2016-12-12T23:28:56.782Z', dateEnd: '2016-12-12T23:28:56.782Z', group: 'home' },
    { id: 7, title: 'January ski', description: 'gentleman ski club coming to Austria, prepare with ski clothes and tickets', state: false, priority: 1, dateCreated: '2016-12-01T23:28:56.782Z', dateStart: '2017-01-16T23:28:56.782Z', dateEnd: '2017-01-19T23:28:56.782Z', group: 'city' },
    { id: 8, title: 'hot pot', description: 'for new years party, we are going to have a hot pot!', state: false, priority: 1, dateCreated: '2016-12-04T23:28:56.782Z', dateStart: '2016-12-31T23:28:56.782Z', dateEnd: '2016-12-31T23:28:56.782Z', group: 'city' },
    { id: 9, title: 'trip to Berlin', description: 'cream, cookies, ...', state: false, priority: 1, dateCreated: '2016-12-03T23:28:56.782Z', dateStart: '2016-12-23T23:28:56.782Z', dateEnd: '2016-12-31T23:28:56.782Z', group: 'city' }
  ];

  priorities = [
    { level: 1, color: 'grey' },
    { level: 2, color: 'orange' },
    { level: 3, color: 'red' }];

  filter: string = 'all';
  filteredTasks: Task[] = this.tasks.slice();
  selectedTask: Task = this.filteredTasks[0];
  selectedTaskClone: Task = this.cloneTask(this.selectedTask); //Object.assign({}, TaskService.filteredTasks[0]);

  tasksSubject: BehaviorSubject<Array<Task>> = new BehaviorSubject(this.filteredTasks);
  taskSubject: BehaviorSubject<Task> = new BehaviorSubject(this.selectedTaskClone);

  isNewTask = false;
  isEditingTask = false;
  isNextPrev = false;

  constructor() {
    console.log('constructing task service.');
  }

  getPriority() {
    return this.priorities;
  }

  getFilteredTasksObservable() {
    console.log('getFilteredTasksObservable tasksSubject', this.tasksSubject);
    return this.tasksSubject;
  }

  getSelectedTasksObservable() {
    console.log('getSelectedTasksObservable taskSubject', this.taskSubject);
    return this.taskSubject;
  }

  getFilterdTask(type: string, term?: string) {
    this.filter = type;

    this.filteredTasksObservable(term);

    if (this.filteredTasks[0]) {
      console.log('filteredTasks[0]', this.filteredTasks[0]);
      this.selectedTask = this.cloneTask(this.filteredTasks[0]);
      this.selectedTaskClone = this.cloneTask(this.selectedTask);
    }

    this.selectedTaskObservable()
  }

  addTask() {
    this.isNewTask = true;
    this.isEditingTask = false;
    this.isNextPrev = false;

    this.selectedTaskClone = new Task();
    this.selectedTaskClone.id = this.getLastId(this.tasks) + 1;
    this.selectedTaskClone.dateCreated = moment().format();
    this.selectedTaskClone.dateStart = moment().format();
    this.selectedTaskClone.dateEnd = moment().format();
    this.selectedTaskClone.state = false;
    this.selectedTaskClone.priority = 1;

    this.selectedTaskObservable();
  };

  nextTask() {
    console.log('task nav: next');
    this.isNextPrev = true;
    const i = this.indexSelectedTask(this.filteredTasks, this.selectedTaskClone.id);
    if (i < this.filteredTasks.length - 1) {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[i + 1]);
      this.selectedTaskObservable();
    }
  }

  prevTask() {
    console.log('task nav: prev');
    this.isNextPrev = true;
    const i = this.indexSelectedTask(this.filteredTasks, this.selectedTaskClone.id);
    if (i > 0) {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[i - 1]);
      this.selectedTaskObservable();
    }
  }

  selectTask(task) {
    console.log('task list: click on task to select');
    this.isNewTask = false;
    this.isEditingTask = true;
    this.isNextPrev = false;

    this.selectedTaskClone = this.cloneTask(task);
    this.selectedTask = this.cloneTask(task);
    this.selectedTaskObservable();
  }

  deleteTask(taskid) {
    console.log('task list: delete');
    const i = this.indexSelectedTask(this.filteredTasks, taskid);

    if (i === 0) {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[0]);
    } else {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[i - 1]);
    }
    if (!this.selectedTaskClone) {
      this.addTask();
      console.log('no tasks on filteredTasks', this.selectedTaskClone);
    }

    this.tasks.forEach((task, i) => {
      if (task.id === taskid) { this.tasks.splice(i, 1) }
    })

    this.selectedTaskObservable();
    this.filteredTasksObservable();
  }

  save(task) {
    console.log('task detail: save', task);
    if (!task.title) {
      task.error = 'title is required field';
    } else {
      task.dateCreated = this.formatDateSave(task.dateCreated);
      task.dateStart = this.formatDateSave(task.dateStart);
      task.dateEnd = this.formatDateSave(task.dateEnd);

      if (this.isNewTask) {
        this.tasks.push(task);
        this.isNewTask = false;
      } else if (this.isEditingTask) {
        this.tasks[this.indexSelectedTask(this.tasks, task.id)] = task;
      }
    }

    this.selectedTask = this.cloneTask(task);
    this.selectedTaskClone = this.cloneTask(task);

    this.filteredTasksObservable();
    this.selectedTaskObservable();
  }

  cancel() {
    console.log('task detail: cancel');
    this.selectedTaskClone = this.cloneTask(this.selectedTask);

    this.tasks[this.indexSelectedTask(this.tasks, this.selectedTask.id)] = this.selectedTask;

    this.filteredTasksObservable();
    this.selectedTaskObservable();
  }

  filteredTasksObservable(term?) {
    const tasks = this.tasks.slice();
    const today = moment().format('L');
    const week = moment().startOf('day').add(7, 'days').format('L');
    if (this.filter === 'today') {
      this.filteredTasks = tasks.filter((item) =>
        moment.utc(item.dateStart).format('L') <= today
        && moment.utc(item.dateEnd).format('L') >= today)
    } else if (this.filter === 'week') {
      this.filteredTasks = tasks.filter((item) =>
        moment.utc(item.dateStart).format('L') <= week
        && moment.utc(item.dateEnd).format('L') >= today)
    } else if (this.filter === 'all') {
      this.filteredTasks = tasks;
    } else if (this.filter === 'active') {
      this.filteredTasks = tasks.filter((item) => item.state === false)
    } else if (this.filter === 'search') {
      this.filteredTasks = tasks.filter((item) => item.title.toUpperCase().indexOf(term.toUpperCase()) !== -1)
    }

    this.tasksSubject.next(this.filteredTasks);
  }

  selectedTaskObservable() {
    this.taskSubject.next(this.selectedTaskClone);
  }

  formatDateDisplay(date) {
    return date.substring(0, 10);;
  }

  formatDateSave(date) {
    return moment(date).format();
  }

  indexSelectedTask(tasks, selectedtaskid) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === selectedtaskid) {
        return i;
      }
    }
  }

  cloneTask(task) {
    let clonetask = Object.assign({}, task);

    clonetask.dateCreated = this.formatDateDisplay(clonetask.dateCreated);
    clonetask.dateStart = this.formatDateDisplay(clonetask.dateStart);
    clonetask.dateEnd = this.formatDateDisplay(clonetask.dateEnd);

    return clonetask
  }

  getLastId(tasks) {
    return tasks.map((task) => task.id)
      .reduce((p, v) => (p > v ? p : v));
  }

}
